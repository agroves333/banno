import React, { Component } from 'react';
import Page from '../pages/Page';
import LoginContainer from '../containers/LoginContainer';

class LoginPage extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'LoginOrRegister | reactGo';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'A reactGo example of a login or register page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <LoginContainer {...this.props} />
      </Page>
    );
  }
}

export default LoginPage;
