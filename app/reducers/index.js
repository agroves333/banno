import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from '../reducers/user';
import favorite from '../reducers/favorite';
import message from '../reducers/message';
import results from '../reducers/results';
import suggestions from '../reducers/suggestions';
import comments from '../reducers/comments';
import query from '../reducers/query';
import * as types from '../types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true;
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  favorite,
  user,
  results,
  suggestions,
  comments,
  message,
  query,
  routing,
});

export default rootReducer;
