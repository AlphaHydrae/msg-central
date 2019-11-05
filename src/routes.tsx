import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/home/home.component';
import { WampPageContainer } from './pages/wamp/wamp.container';
import { WsPage } from './pages/ws/ws.component';

export function Routes() {
  return (
    <Switch>
      <Route path='/' exact={true} component={HomePage} />
      <Route path='/wamp' component={WampPageContainer} />
      <Route path='/ws' component={WsPage} />
    </Switch>
  );
}