import React from 'react';
import PropTypes from 'prop-types';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import classNames from 'classnames/bind';
import styles from '../css/components/remove';

const cx = classNames.bind(styles);

const Remove = ({data, remove}) => {

  const handleClick = (event) => {
    event.stopPropagation();
    remove(data.videoId);
  };

  return (
      <Glyphicon
          onClick={handleClick}
          className={cx('save')}
          glyph={'remove'} />
  );
};

Remove.propTypes = {
  remove: PropTypes.func,
  data: PropTypes.object
};

export default Remove;
