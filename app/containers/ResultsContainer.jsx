import {connect} from 'react-redux';
import {search} from 'actions/search';
import {save, unsave} from 'actions/save';
import Results from 'components/Results';

const mapStateToProps = (state) => {
    return {
        results: state.results,
        query: state.query,
    }
};

export default connect(mapStateToProps, {search, save, unsave})(Results);
