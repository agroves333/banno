import {connect} from 'react-redux';
import Comments from 'components/Comments';
import {searchComments} from 'actions/search';

const mapStateToProps = state => {
  return {
    comments: state.comments
  }
};

export default connect(mapStateToProps, {searchComments})(Comments);
