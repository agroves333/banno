import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Comment from 'components/Comment';

import get from 'lodash/get';
import classNames from 'classnames/bind';
import styles from '../css/components/comments';
const cx = classNames.bind(styles);

class Comments extends Component {

  componentDidMount() {
    this.props.searchComments(this.props.videoId);
  }

  renderComments() {
    return get(this.props, 'comments.items', []).map((comment, key) => {
      return <Comment key={key}
                      data={comment} />
    })
  };

  render() {
    return (
        <div className={cx('wrapper')}>
          <h3 className={cx('header')}>Comments</h3>
          <ul className={cx('comments')}>
            {this.renderComments()}
          </ul>
        </div>
    );
  }
}

Comments.propTypes = {
  videoId: PropTypes.number,
  comments: PropTypes.array
};

Comments.defaultProps = {
  comments: []
};

export default Comments;
