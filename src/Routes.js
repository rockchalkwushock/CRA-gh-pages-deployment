/**
 * Using react-router@3.0.2
 */
import React from 'react';
import { browserHistory, Route, Router } from 'react-router';
import App from './App';
import { Page404 } from './pages';

/**
 * Utilize process.env.PUBLIC_URL that is exposed by create-react-app internally:
 * See: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/env.js
 * By prefixing the root path with process.env.PUBLIC_URL the root path will now match your Github specific url:
 * process.env.PUBLIC_URL + '/' === https://<username>.github.io/
 * See: https://github.com/facebookincubator/create-react-app/issues/1765
 */

export default () => (
  <Router history={browserHistory}>
    <Route path={`${process.env.PUBLIC_URL}/`} component={App}>
      <Route path='/one' />
      <Route path='/two' />
    </Route>
    <Route path='*' component={Page404} />
  </Router>
);