import React from 'react';
import PropTypes from 'prop-types';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import classNames from 'classnames/bind';
import styles from '../css/components/save';

const cx = classNames.bind(styles);

const Save = ({data, saved, save, unsave}) => {

  const handleClick = (event) => {
    event.stopPropagation();
    saved ? unsave(data.videoId) : save(data)
  };

  return (
      <Glyphicon
          onClick={handleClick}
          className={cx('save')}
          glyph={saved ? 'star' : 'star-empty'} />
  );
};

Save.propTypes = {
  saved: PropTypes.bool,
  save: PropTypes.func,
  unsaved: PropTypes.func,
  data: PropTypes.object,
};

export default Save;
