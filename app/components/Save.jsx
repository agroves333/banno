import React from 'react';
import PropTypes from 'prop-types';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import classNames from 'classnames/bind';
import styles from '../css/components/save';

const cx = classNames.bind(styles);

const Save = ({isSaved, save, unsave, onClick}) => {

  return (
      <Glyphicon
          onClick={onClick}
          className={cx('save')}
          glyph={isSaved ? 'star' : 'star-empty'} />
  );
};

Save.propTypes = {
  onClick: PropTypes.func,
  isSaved: PropTypes.bool,
  save: PropTypes.func,
  unsaved: PropTypes.func,
  data: PropTypes.object
};

export default Save;
