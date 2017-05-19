import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import Search from '../components/Search';
import VideoResults from '../containers/VideoResults';

// Actions
import {createFavorite, typing, destroyFavorite} from '../actions/favorites';

// Styles
import styles from '../css/components/home';

const cx = classNames.bind(styles);

class Home extends Component {
    render() {
        const {newFavorite, favorites, typing, createFavorite, destroyFavorite} = this.props;
        return (
            <div className={cx('home')}>
                <div className="row">
                    <div className="col-xs-12">
                      <Search
                          favorite={newFavorite}
                          onEntryChange={typing}
                          onEntrySave={createFavorite}/>
                      <VideoResults />
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
  favorites: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  createFavorite: PropTypes.func.isRequired,
  destroyFavorite: PropTypes.func.isRequired,
  newFavorite: PropTypes.string
};

function mapStateToProps(state) {
  return {
    favorites: state.favorite.favorites,
    newFavorite: state.favorite.newFavorite
  };
}

export default connect(mapStateToProps, {createFavorite, typing, destroyFavorite})(Home);
