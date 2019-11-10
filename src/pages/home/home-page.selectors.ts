import { createSelector } from 'reselect';

import { selectActiveWampConnections } from '../../domain/wamp/wamp.selectors';
import { selectActiveWsConnections } from '../../domain/ws/ws.selectors';

export const selectWampConnectionOpen = createSelector(
  selectActiveWampConnections,
  active => active.length >= 1
);

export const selectWsConnectionOpen = createSelector(
  selectActiveWsConnections,
  active => active.length >= 1
);