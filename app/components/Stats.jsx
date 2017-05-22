import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import has from 'lodash/has';
import get from 'lodash/get';

import classNames from 'classnames/bind';
import styles from '../css/components/stats';
const cx = classNames.bind(styles);

class Stats extends Component {
  
  componentDidMount() {
    // Used cached stats if they exist, otherwise fetch new ones
    !has(this.props, `stats.${this.props.videoId}`) && this.props.searchStats(this.props.videoId);
  }

  render() {
    const likeCount = get(this.props, `stats.${this.props.videoId}.likeCount`);
    const dislikeCount = get(this.props, `stats.${this.props.videoId}.dislikeCount`);
    const viewCount = get(this.props, `stats.${this.props.videoId}.viewCount`);
    const commentCount = get(this.props, `stats.${this.props.videoId}.commentCount`);

    return (
        <div className={cx('stats', 'row')}>
          <div className="col-xs-3">
            <Glyphicon className={cx('likes')} glyph="thumbs-up" />{likeCount}
          </div>
          <div className="col-xs-3">
            <Glyphicon className={cx('dislikes')} glyph="thumbs-down" />{dislikeCount}
          </div>
          <div className="col-xs-3">
            <Glyphicon className={cx('views')} glyph="eye-open" />{viewCount}
          </div>
          <div className="col-xs-3">
            <Glyphicon className={cx('comments')} glyph="comment" />{commentCount}
          </div>
        </div>
    );
  }
}

Stats.propTypes = {
  stats: PropTypes.object
};

Stats.defaultProps = {
  stats: []
};

export default Stats;
