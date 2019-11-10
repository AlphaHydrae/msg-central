import { createSelector } from 'reselect';

import { selectWsConnections } from '../../domain/ws/ws.selectors';

export const selectWsConnectionControlsEnabled = createSelector(
  selectWsConnections,
  connections => connections.length >= 1
);