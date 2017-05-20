import React, { Component } from 'react';
import Page from '../pages/Page';
import Home from '../components/Home';

class HomePage extends Component {
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
        <Home {...this.props} />
      </Page>
    );
  }
}

export default HomePage;

