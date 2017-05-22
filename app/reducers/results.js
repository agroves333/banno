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
        ...action.data,
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