import {SEARCH, RECEIVE_RESULTS, SEARCH_ERROR} from 'types';

const results = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        isLoading: true
      };
    case RECEIVE_RESULTS:
      return {
        ...state,
        items: action.data.items,
        totalResults: action.data.totalResults,
        searchTime: action.data.searchTime,
        page: action.data.page,
        prev: action.data.prev,
        next: action.data.next,
        isLoading: false
      };
    case SEARCH_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};

export default results;