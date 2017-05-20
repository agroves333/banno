import {UPDATE_QUERY} from 'types';

export default (state = '', action) => {
  switch (action.type) {

    case UPDATE_QUERY:
      return action.query;

    default:
      return state;
  }
};