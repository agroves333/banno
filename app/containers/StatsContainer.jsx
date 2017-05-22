import {connect} from 'react-redux';
import Stats from 'components/Stats';
import {searchStats} from 'actions/search';

const mapStateToProps = state => {
  return {
    stats: state.stats
  }
};

export default connect(mapStateToProps, {searchStats})(Stats);
