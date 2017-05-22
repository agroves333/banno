import React, { Component } from 'react';
import Page from '../pages/Page';
import FavoritesContainer from '../containers/FavoritesContainer';

class FavoritesPage extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'BannoTube | Favorites';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Favorite Videos' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <FavoritesContainer />
      </Page>
    );
  }
}

export default FavoritesPage;

