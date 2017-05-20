import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/comment';

const cx = classNames.bind(styles);

const Comment = ({data}) => {
  const {name, text, image, publishedAt} = data;
  return (
    <li className={cx('comment')}>
      <div className="row">
        <div className="col-xs-2">
          <img className={cx('image', 'img-responsive')}
               src={image} alt=""/>
        </div>
        <div className="col-xs-10">
          <div className="name">{name}</div>
          <div className="text" dangerouslySetInnerHTML={{__html: text}}></div>
          <div className="publishedAt">{publishedAt}</div>
        </div>
      </div>
    </li>
  );
};

Comment.propTypes = {
  data: PropTypes.object
};

export default Comment;
