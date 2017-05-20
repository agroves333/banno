import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/comment';
import moment from 'moment';
const cx = classNames.bind(styles);

const Comment = ({data}) => {
  const {name, text, image, authorUrl, publishedAt} = data;
  return (
    <li className={cx('comment')}>
      <div className="row">
        <div className="col-xs-2">
          <a href={authorUrl} target="_blank">
            <img className={cx('image', 'img-responsive')}
                 src={image} alt=""/>
          </a>
        </div>
        <div className="col-xs-10">
          <a href={authorUrl} target="_blank">
            {name}
          </a>
          <span className={cx('publishedAt')}>{moment(publishedAt).fromNow()}</span>
          <div className={cx('text')} dangerouslySetInnerHTML={{__html: text}}></div>
        </div>
      </div>
    </li>
  );
};

Comment.propTypes = {
  data: PropTypes.object
};

export default Comment;
