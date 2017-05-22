import {connect} from 'react-redux';
import Favorites from 'components/Favorites';

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites
    }
};

export default connect(mapStateToProps)(Favorites);
