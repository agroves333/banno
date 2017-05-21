import {polyfill} from 'es6-promise';
import axios from 'axios';
import {get, has} from 'lodash';
import config from 'config';
import {SEARCH, SEARCH_COMMENTS, RECEIVE_RESULTS, RECEIVE_COMMENTS, SEARCH_ERROR, SEARCH_COMMENT_ERROR, UPDATE_QUERY} from 'types';

polyfill();

const requestResults = () => {
  return {
    type: SEARCH
  }
};

const requestComments = () => {
  return {
    type: SEARCH_COMMENTS
  }
};

const receiveResults = data => {
  return {
    type: RECEIVE_RESULTS,
    data
  };
};

const receiveComments = data => {
  return {
    type: RECEIVE_COMMENTS,
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

const searchCommentError = (error, searchType, provider) => {
  return {
    type: SEARCH_COMMENT_ERROR,
    error,
    searchType,
    provider
  };
};

const updateQuery = (query) => {
  return {
    type: UPDATE_QUERY,
    query
  };
};

export const search = (query, page = null, filter) => {
  return dispatch => {
    dispatch(requestResults());
    dispatch(updateQuery(query));
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

export const searchComments = (videoId, page = null) => {
  return dispatch => {
    dispatch(requestComments());
    axios.get(config.youTubeCommentsBaseURL, {
      params: {
        key: config.googleApiKey,
        part: 'snippet,replies',
        videoId,
        pageToken: page,
      }
    }).then(response => {
      if (response.status === 200) {
        const items = get(response, 'data.items', []).map((item) => {
          const comment = get(item, 'snippet.topLevelComment.snippet', []);
          return {
            name: comment.authorDisplayName,
            authorUrl: comment.authorChannelUrl,
            image: comment.authorProfileImageUrl,
            text: comment.textDisplay,
            publishedAt: comment.publishedAt,
          }
        });

        dispatch(receiveComments({
          videoId,
          items,
          totalResults: get(response, 'data.pageInfo.totalResults', 0),
          next: get(response, 'data.nextPageToken', null)
        }));
      } else {
        dispatch(searchCommentError('error'));
      }
    }).catch((error) => {
      dispatch(searchCommentError(error));
    });
  }
};