import {SEARCH_STATS, RECEIVE_STATS, SEARCH_STATS_ERROR} from 'types';

const stat = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_STATS:
      return {
        ...state,
        ...action.data
      };
    case SEARCH_STATS_ERROR:
      return {
        ...state,
        error: action.error
      };
  }
};

const stats = (state = [], action) => {
  switch (action.type) {
    case SEARCH_STATS:
      return {
        ...state
      };
    case RECEIVE_STATS:
      return {
        ...state,
        [action.data.videoId]: stat(state[action.data.videoId], action),
      };
    case SEARCH_STATS_ERROR:
      return {
        ...state,
        [action.data.videoId]: stat(state[action.data.videoId], action),
      };
    default:
      return state;
  }
};

export default stats;