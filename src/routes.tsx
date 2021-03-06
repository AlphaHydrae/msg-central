import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePageContainer } from './pages/home/home-page.container';
import { WampPageContainer } from './pages/wamp/wamp-page.container';
import { WsPageContainer } from './pages/ws/ws-page.container';

export function Routes() {
  return (
    <Switch>
      <Route path='/' exact={true} component={HomePageContainer} />
      <Route path='/wamp' component={WampPageContainer} />
      <Route path='/ws' component={WsPageContainer} />
    </Switch>
  );
}