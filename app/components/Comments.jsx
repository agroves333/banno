import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Comment from 'components/Comment';

import get from 'lodash/get';
import has from 'lodash/has';

import classNames from 'classnames/bind';
import styles from '../css/components/comments';
const cx = classNames.bind(styles);

class Comments extends Component {

  constructor(props) {
    super(props);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentDidMount() {
    // Used cached comments if they exist, otherwise fetch new ones
    !has(this.props, `comments.${this.props.videoId}`) && this.props.searchComments(this.props.videoId);
  }

  handleLoadMore(event) {
    this.props.searchComments(this.props.videoId, get(this.props, 'comments.next', ''), true);
  }

  renderComments() {
    return get(this.props, `comments.${this.props.videoId}.items`, []).map((comment, key) => {
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
          <button
              className="btn btn-primary center-block"
              onClick={this.handleLoadMore}>
            Load More
          </button>
        </div>
    );
  }
}

Comments.propTypes = {
  videoId: PropTypes.number,
  comments: PropTypes.object
};

Comments.defaultProps = {
  comments: []
};

export default Comments;
