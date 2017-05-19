import {polyfill} from 'es6-promise';
import axios from 'axios';
import {get, has} from 'lodash';
import config from 'config';
import {SEARCH, RECEIVE_RESULTS, SEARCH_ERROR, QUERY, RELATED} from 'types';

polyfill();

export const updateQuery = query => {
  return {
    type: QUERY,
    query
  }
};

const requestResults = data => {
  return {
    type: SEARCH,
    data
  }
};

const receiveResults = data => {
  return {
    type: RECEIVE_RESULTS,
    data
  };
};

const searchError = (error, searchType, provider) => {
  return {
    type: SEARCH_ERROR,
    error,
    searchType,
    provider
  };
};

const search = (query, page = null, filter) => {
  return dispatch => {
    dispatch(requestResults({searchType: 'videos', provider: 'youtube'}));

    const startTime = new Date();
    const order = get(filter, 'order', 'relevance');
    const videoDuration = get(filter, 'videoDuration', 'any');
    const videoDefinition = get(filter, 'videoDefinition', 'any');
    const videoDimension = get(filter, 'videoDimension', 'any');

    axios.get(config.youTubeSearchBaseURL, {
      params: {
        type: 'video',
        key: config.googleApiKey,
        part: 'snippet',
        q: query,
        pageToken: page,
        maxResults: 10,
        order,
        videoDuration,
        videoDefinition,
        videoDimension
      }
    }).then(response => {
      if (response.status === 200) {
        const items = get(response, 'data.items', []).map((item) => {
          return {
            title: item.snippet.title,
            publishedAt: item.snippet.publishedAt,
            description: item.snippet.description,
            videoId: item.id.videoId,
            thumbnailUrl: get(item, 'snippet.thumbnails.default.url', '')
          }
        });

        const totalResults = get(response, 'data.pageInfo.totalResults', 0);
        const endTime = new Date();
        const searchTime = (endTime - startTime) / 1000;

        dispatch(receiveResults({
          searchType: 'videos',
          provider: 'youtube',
          items,
          prev: get(response, 'data.prevPageToken', null),
          next: get(response, 'data.nextPageToken', null),
          totalResults,
          searchTime
        }));
      } else {
        dispatch(searchError('error'));
      }
    }).catch((error) => {
      dispatch(searchError(error));
    });
  }
};