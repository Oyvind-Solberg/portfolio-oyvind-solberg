import React from 'react';
import { useStore } from './store/store';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFileAlt,
  faCode,
  faGlobe,
  faPhone,
  faEnvelope,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import withMessageHandler from './hoc/withMessageHandler/withMessageHandler';
import axios from './axios-PortfolioAPI';

import LandingPage from './containers/LandingPage/LandingPage';
import Admin from './containers/Admin/Admin';
import Login from './containers/Auth/Login/Login';

library.add(faFileAlt, faCode, faGlobe, faPhone, faEnvelope, faSignOutAlt);

function App() {
  const { isLoggedIn } = useStore()[0];

  let routes = (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/admin" exact component={Login} />
      <Redirect to="/" />
    </Switch>
  );

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/admin" exact component={Admin} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return <>{routes}</>;
}

export default withRouter(withErrorHandler(withMessageHandler(App), axios));
