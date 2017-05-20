import {SEARCH_COMMENTS, RECEIVE_COMMENTS, SEARCH_COMMENTS_ERROR} from 'types';

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
        items: action.data.items,
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
    default:
      return state;
  }
};

export default comments;