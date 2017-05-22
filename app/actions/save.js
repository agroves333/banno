/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from '../types';
import { favoriteService } from '../services';

function destroy(id) {
  return { type: types.DESTROY_FAVORITE, id };
}

function createFavoriteRequest(data) {
  return {
    type: types.CREATE_FAVORITE_REQUEST,
    data
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
    data
  };
}

export function save(data) {
  return (dispatch) => {

    const id = data.videoId;

    dispatch(createFavoriteRequest(data));

    return favoriteService().createFavorite({ id, data })
      .then((res) => {
        if (res.status === 200) {
          return dispatch(createFavoriteSuccess());
        }
      })
      .catch(err => {
        return dispatch(createFavoriteFailure({ id, error: err + ' Oops! Something went wrong and we couldn\'t save your video'}));
      });
  };
}

export function unsave(id) {
  return (dispatch) => {
    return favoriteService().deleteFavorite({ id })
      .then(() => dispatch(destroy(id)))
      .catch(() => dispatch(createFavoriteFailure({id,
        error: 'Oops! Something went wrong and we couldn\'t unsave your video'})));
  };
}
