import React from 'react';
import PropTypes from 'prop-types';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import classNames from 'classnames/bind';
import styles from '../css/components/remove';

const cx = classNames.bind(styles);

const Remove = ({data, remove, onClick}) => {
  
  return (
      <Glyphicon
          onClick={onClick}
          className={cx('remove')}
          glyph="remove" />
  );
};

Remove.propTypes = {
  remove: PropTypes.func,
  data: PropTypes.object,
  onClick: PropTypes.func
};

export default Remove;
