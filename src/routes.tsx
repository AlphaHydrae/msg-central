import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { WampPage } from './pages/wamp/wamp.component';

export function Routes() {
  return (
    <Switch>
      <Route path='/' exact={true} component={WampPage} />
    </Switch>
  );
}