import { combineReducers } from 'redux';
import * as types from '../types';

const favorite = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_FAVORITE_REQUEST:
      return {
        id: action.id,
        text: action.text
      };
    default:
      return state;
  }
};

const favorites = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.CREATE_FAVORITE_REQUEST:
      return [...state, favorite(undefined, action)];
    case types.CREATE_FAVORITE_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.DESTROY_FAVORITE:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

const newFavorite = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPING:
      return action.newFavorite;
    case types.CREATE_FAVORITE_REQUEST:
      return '';
    default:
      return state;
  }
};

const favoriteReducer = combineReducers({
  favorites,
  newFavorite
});

export default favoriteReducer;
