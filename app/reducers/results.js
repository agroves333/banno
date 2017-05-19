import {SEARCH, RECEIVE_RESULTS, SEARCH_ERROR, RECEIVE_TIME, RECEIVE_WEATHER} from 'types';

const provider = (state = {}, action) => {
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
    case RECEIVE_WEATHER:
      return {
        ...state,
        [action.data.weatherType]: action.data.weather
      };
    case SEARCH_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

const searchType = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        [action.data.provider]: provider(state[action.data.provider], action)
      };
    case RECEIVE_TIME:
      return {
        ...state,
        time: {
          timeZone: action.data.timeZone,
          timeZoneName: action.data.timeZoneName,
          timeDifference: action.data.timeDifference,
          country: action.data.country,
        }
      };
    case RECEIVE_WEATHER:
    case RECEIVE_RESULTS:
    case SEARCH_ERROR:
      return {
        ...state,
        [action.data.provider]: provider(state[action.data.provider], action)
      };
    default:
      return state;
  }
};

const results = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        isLoading: true,
        [action.data.searchType]: searchType(state[action.data.searchType], action),
      };
    case RECEIVE_RESULTS:
    case RECEIVE_TIME:
    case RECEIVE_WEATHER:
    case SEARCH_ERROR:
      return {
        ...state,
        [action.data.searchType]: searchType(state[action.data.searchType], action),
        isLoading: false
      };
    default:
      return state;
  }
};

export default results;