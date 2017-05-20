import React from 'react';
import Page from '../pages/Page';
import App from '../components/App';
import { title, meta, link } from './assets';

export default props => (
  <Page title={title} meta={meta} link={link}>
    <App {...props} />
  </Page>
);