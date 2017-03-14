# Using `browserHistory` with Gh-Page deployments for `create-react-app`

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

**Live Demo**: https://rockchalkwushock.github.io/CRA-gh-pages-deployment/

## Disclaimer
You should read the section on [client-side-routing](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#notes-on-client-side-routing) in the `create-react-app` documentation for understanding why Github Pages does not play well with client-side-routing.

- This demo is using `react-router@3.0.2`.

## SPA-Github-Pages
As noted in the `create-react-app` docs if not choosing to use `hashHistory` one needs to follow the documentation in this [repository](https://github.com/rafrex/spa-github-pages) for using the `browserHistory` method.

## The Problem:
The SPA-Github-Pages fix is a very clever way to handle the issue with client-side routing; however, it fails to handle this case:

> _The root path of the client-side-routing does not match the url passed as `"homepage":` in the `package.json`._

_Routes.js_
```javascript
import { browserHistory, Route, Router } from 'react-router';
import App from './App';
import { Page404 } from './pages';

// "homepage": "https://<username>.github.io/<project-name>/",

export default () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/one' />
      <Route path='/two' />
    </Route>
    <Route path='*' component={Page404} />
  </Router>
)
```
The current configuration has the _root path_ as `/` which will match `'https:/<username>.github.io/'`. In this instance the view seen on traveling to the GitHub Pages link will be the `Page404` because the router reads `/<project-name>/` as an undefined route. On traveling to `'https:/<username>.github.io/'` the Github 404 will be seen because it is not hosting `/<project-name>/` anymore.

## The Solution:
`create-react-app` has an env var that is exposed called `process.env.PUBLIC_URL`. This env var provides the application with the data provided to the `package.json` as `"homepage":`

> See: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/paths.js#L62

> See: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/env.js#L29

With this exposed across the whole application we can make the following adjustment:

_Routes.js_
```javascript
<Route path={`${process.env.PUBLIC_URL}/`} component={App}>
```

Now when visiting the Github Pages link you will be directed to the root path's view.

### Routing Tree for `<Router/>` vs Browser
All subsequent _routes_ on the router will replace `/<project-name>/`:

| Router  | Browser                                       |
|---------|-----------------------------------------------|
| `'/'`     | `'https://username.github.io/project-name/'`    |
| `'/one'`  | `'https://username.github.io/one'`              |
| `'/two'`  | `'https://username.github.io/two'`              |
| `'*'`     | `'https://username.github.io/project-name/*'` |

GitHub 404's will be reached if traveling to:
- 'https://username.github.io/'
- 'https://username.github.io/onex'
- 'https://username.github.io/one/x'

> _**Please Note that any navigation back to the root path outside of the `<Router/>` must explicitly be stated in the same manner.**_
