import React, {Component} from 'react';
import classNames from 'classnames/bind';
import SearchContainer from '../containers/SearchContainer';
import VideoListContainer from '../containers/VideoListContainer';

// Styles
import styles from '../css/components/home';

const cx = classNames.bind(styles);

const Home = () => {
      return (
          <div className={cx('home')}>
              <div className="row">
                  <div className="col-xs-12">
                    <SearchContainer />
                    <VideoListContainer />
                  </div>
              </div>
          </div>
      );
};

export default Home;
