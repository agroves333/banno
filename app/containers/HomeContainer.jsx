import {connect} from 'react-redux';
import Home from 'components/Home';

// Actions
import {createFavorite, typing, destroyFavorite} from '../actions/favorites';

function mapStateToProps(state) {
  return {
    favorites: state.favorite.favorites,
    newFavorite: state.favorite.newFavorite
  };
}

export default connect(mapStateToProps, {createFavorite, typing, destroyFavorite})(Home);
