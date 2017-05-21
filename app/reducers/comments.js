import {SEARCH_COMMENTS, RECEIVE_COMMENTS, SEARCH_COMMENTS_ERROR} from 'types';

const comment = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        items: state.items ? state.items.concat(action.data.items) : action.data.items,
        totalResults: action.data.totalResults,
        prev: action.data.prev,
        next: action.data.next,
        isLoading: false
      };
    case SEARCH_COMMENTS_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
  }
};

const comments = (state = [], action) => {
  switch (action.type) {
    case SEARCH_COMMENTS:
      return {
        ...state,
        isLoading: true
      };
    case RECEIVE_COMMENTS:
      return {
        ...state,
        [action.data.videoId]: comment(state[action.data.videoId], action),
      };
    case SEARCH_COMMENTS_ERROR:
      return {
        ...state,
        [action.data.videoId]: comment(state[action.data.videoId], action),
      };
    default:
      return state;
  }
};

export default comments;