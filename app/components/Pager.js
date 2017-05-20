import React, {Component} from 'react'
import PropTypes from 'prop-types';
import RBPager from 'react-bootstrap/lib/Pager';
const PagerItem = RBPager.Item;
import {get, has} from 'lodash';

import styles from 'css/components/pagers';

class Pager extends Component {

  constructor() {
    super();

    this.state = {
      page: 1
    };
  }

  handleSelect(pageType) {
    this.props.search(
            this.props.query,
            this.props.results ? this.props.results[pageType] : '',
            this.props.filter
    );

    if (pageType === 'prev') {
      this.setState({
        page: this.state.page - 1
      });
    }
    else if (pageType === 'next') {
      this.setState({
        page: this.state.page + 1
      });
    }
  };

  render() {
    return (
        <div className="clearfix">
          <RBPager>
            <PagerItem previous
                       onSelect={() => this.handleSelect('prev')}
                       disabled={get(this.props.results, `prev`, null) === null}>
              &larr; Previous Page
            </PagerItem>
            <PagerItem next
                       onSelect={() => this.handleSelect('next')}
                       disabled={get(this.props.results, `next`, null) === null}>
              Next Page &rarr;
            </PagerItem>
          </RBPager>
          {this.props.children}
          <RBPager>
            <PagerItem previous
                       onSelect={() => this.handleSelect('prev')}
                       disabled={get(this.props.results, `prev`, null) === null}>
              &larr; Previous Page
            </PagerItem>
            <PagerItem next
                       onSelect={() => this.handleSelect('next')}
                       disabled={get(this.props.results, `next`, null) === null}>
              Next Page &rarr;
            </PagerItem>
          </RBPager>
        </div>
    );
  }
}

Pager.propTypes = {
  results: PropTypes.object.isRequired,
  query: PropTypes.string,
  provider: PropTypes.string,
  filter: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    results: state.results,
    query: state.query
  }
};

export default Pager;
