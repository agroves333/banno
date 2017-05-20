import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SearchContainer from '../containers/SearchContainer';
import ResultsContainer from '../containers/ResultsContainer';

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
                      <SearchContainer
                          favorite={newFavorite}
                          onEntryChange={typing}
                          onEntrySave={createFavorite}/>
                      <ResultsContainer />
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

export default Home;
