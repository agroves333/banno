import {connect} from 'react-redux';
import Favorites from 'components/Favorites';
import {unsave} from 'actions/save';

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites
    }
};

export default connect(mapStateToProps, {unsave})(Favorites);
