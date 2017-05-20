import {connect} from 'react-redux';
import Search from 'components/Search';

// Actions
import {search} from 'actions/search'
import {suggest} from 'actions/suggest';

function mapStateToProps(state) {

    return {
        query: state.query,
        suggestions: state.suggestions
    }
}

export default connect(mapStateToProps, {search, suggest})(Search);
