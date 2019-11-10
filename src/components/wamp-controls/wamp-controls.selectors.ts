import { createSelector } from 'reselect';
import { selectWampConnections } from '../../domain/wamp/wamp.selectors';

export const selectWampConnectionControlsEnabled = createSelector(
  selectWampConnections,
  connections => connections.length >= 1
);