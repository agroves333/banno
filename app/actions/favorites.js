/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { favoriteService } from '../services';

function destroy(id) {
  return { type: types.DESTROY_FAVORITE, id };
}

function createFavoriteRequest(data) {
  return {
    type: types.CREATE_FAVORITE_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

function createFavoriteSuccess() {
  return {
    type: types.CREATE_FAVORITE_SUCCESS
  };
}

function createFavoriteFailure(data) {
  return {
    type: types.CREATE_FAVORITE_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function typing(text) {
  return {
    type: types.TYPING,
    newFavorite: text
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createFavorite(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { topic } = getState();
    const data = {
      count: 1,
      id,
      text
    };

    // First dispatch an optimistic update
    dispatch(createFavoriteRequest(data));

    return favoriteService().createFavorite({ id, data })
      .then((res) => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_FAVORITE_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createFavoriteSuccess());
        }
      })
      .catch(() => {
        return dispatch(createFavoriteFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}

export function destroyFavorite(id) {
  return (dispatch) => {
    return favoriteService().deleteFavorite({ id })
      .then(() => dispatch(destroy(id)))
      .catch(() => dispatch(createFavoriteFailure({id,
        error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}
