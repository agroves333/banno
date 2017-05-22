import {connect} from 'react-redux';
import {search} from 'actions/search';
import {save, unsave} from 'actions/save';
import VideoList from 'components/VideoList';

const mapStateToProps = (state) => {
    return {
        results: state.results,
        query: state.query,
        favorites: state.favorites,
        isLoggedIn: state.user && state.user.authenticated ? true : false
    }
};

export default connect(mapStateToProps, {search, save, unsave})(VideoList);
