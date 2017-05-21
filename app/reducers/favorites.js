import * as types from '../types';

const favorite = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_FAVORITE_REQUEST:
      return {
        title: action.data.title,
        publishedAt: action.data.publishedAt,
        description: action.data.description,
        videoId: action.data.videoId,
        thumbnailUrl: action.data.thumbnailUrl
      };
    default:
      return state;
  }
};

const favorites = (state = [], action) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.CREATE_FAVORITE_REQUEST:
      return [...state, favorite(undefined, action)];
    case types.CREATE_FAVORITE_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.DESTROY_FAVORITE:
      return state.filter(t => t.videoId !== action.id);
    default:
      return state;
  }
};

export default favorites;
