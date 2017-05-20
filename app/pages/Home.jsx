import React, { Component } from 'react';
import Page from '../pages/Page';
import HomeContainer from '../containers/HomeContainer';

class Home extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Home';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Home' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <HomeContainer {...this.props} />
      </Page>
    );
  }
}

export default Home;

