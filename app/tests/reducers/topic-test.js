import expect from 'expect';
import md5 from 'spark-md5';
import reducer from '../../reducers/topic';
import * as types from '../../types';

describe('Topics reducer', () => {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function createTopic() {
    return Array(5).join().split(',')
    .map(() => {
      return s.charAt(Math.floor(Math.random() * s.length));
    })
    .join('');
  }

  const topic = createTopic();

  function createData() {
    return {
      text: createTopic(),
      id: md5.hash(createTopic()),
      count: Math.floor(Math.random() * 100)
    };
  }

  const data = createData();

  function createTopics(x) {
    const arr = [];
    for (let i = 0; i < x; i++) {
      arr.push(createData());
    }
    return arr;
  }

  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        topics: [],
        newFavorite: ''
      }
    );
  });

  it('Should add a new topic to an empty initial state', () => {
    expect(
      reducer(undefined, {
        type: types.CREATE_TOPIC_REQUEST,
        id: data.id,
        count: 1,
        text: topic
      })
    ).toEqual({
        topics: [
          {
            id: data.id,
            count: 1,
            text: topic
          }
        ],
        newFavorite: ''
    });
  });

  it('Should handle TYPING', () => {
    expect(
      reducer(undefined, {
        type: types.TYPING,
        newFavorite: topic
      })
    ).toEqual({
        topics: [],
        newFavorite: topic
    });
  });

  it('Should handle CREATE_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: types.CREATE_REQUEST
      })
    ).toEqual({
        topics: [],
        newFavorite: ''
    });
  });

  it('Should handle REQUEST_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.REQUEST_SUCCESS,
        data: topic
      })
    ).toEqual({
        topics: topic,
        newFavorite: ''
    });
  });

  it('Should handle CREATE_TOPIC_REQUEST', () => {
    const topics = createTopics(20);
    const newFavorites = [...topics, data];
    expect(
      reducer({
        topics
      },
      {
        type: types.CREATE_TOPIC_REQUEST,
        id: data.id,
        count: data.count,
        text: data.text

      })
    ).toEqual({
        newFavorite: '',
        topics: newFavorites
    });
  });

  it('should handle CREATE_TOPIC_FAILURE', () => {
    const topics = createTopics(20);
    topics.push(data);
    const newFavorites = [...topics];
    expect(
      reducer({
        topics,
        newFavorite: topic
      },
      {
        type: types.CREATE_TOPIC_FAILURE,
        id: data.id
      })
    ).toEqual({
        topics: newFavorites.pop() && newFavorites,
        newFavorite: topic
    });
  });

  it('should handle DESTROY_TOPIC', () => {
    const topics = createTopics(20);
    topics.push(data);
    const newFavorites = [...topics];
    expect(
      reducer({
        topics,
        newFavorite: topic
      },
      {
        type: types.DESTROY_TOPIC,
        id: topics[topics.length - 1].id,
      })
    ).toEqual({
        topics: newFavorites.pop() && newFavorites,
        newFavorite: topic
    });
  });

  it('should handle INCREMENT_COUNT', () => {
    const topics = createTopics(20);
    const newFavorites = [...topics];
    topics.push(data);
    const newData = Object.assign({}, data);
    newData.count++;
    newFavorites.push(newData);

    expect(
      reducer({
        topics,
        newFavorite: topic
      },
      {
        type: types.INCREMENT_COUNT,
        id: topics[topics.length - 1].id,
      })
    ).toEqual({
        topics: newFavorites,
        newFavorite: topic
    });
  });

  it('should handle DECREMENT_COUNT', () => {
    const topics = createTopics(20);
    const newFavorites = [...topics];
    topics.push(data);
    const newData = Object.assign({}, data);
    newData.count--;
    newFavorites.push(newData);

    expect(
      reducer({
        topics,
        newFavorite: topic
      },
      {
        type: types.DECREMENT_COUNT,
        id: topics[topics.length - 1].id,
      })
    ).toEqual({
        topics: newFavorites,
        newFavorite: topic
    });
  });
});
