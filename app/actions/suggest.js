import { polyfill } from 'es6-promise';
import request from 'axios';
import {get} from 'lodash';
import {SUGGEST}  from 'types';

polyfill();

const updateSuggestions = (suggestions) => {
    return {
        type: SUGGEST,
        suggestions
    }
};

export const suggest = (query) => {
  return dispatch => {
    if (query) {
      return request.get('/api/suggest', {
        params: {
          query
        }
      }).then(response => {
        if (response.status === 200) {
          let suggestions = response.data[1].slice(0, 10); // first 10
          suggestions.unshift(query); // add query to beginning
          dispatch(updateSuggestions(suggestions));
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  };
};