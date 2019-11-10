import { createSelector } from 'reselect';

import { createCommunicationActionInProgressSelector } from '../../concerns/comm/comm.utils';
import { selectWsConnectionsDictionary } from '../../concerns/session/session.selectors';
import { selectDataState } from '../../store/selectors';
import { isNotUndefined } from '../../utils/validations';
import { connectToWsServer } from './ws.actions';

export const selectActiveWsConnections = createSelector(
  selectDataState,
  data => data.activeWsConnections
);

export const selectConnectingToWsServer = createCommunicationActionInProgressSelector(connectToWsServer);

export const selectCurrentWsConnection = createSelector(
  selectActiveWsConnections,
  selectWsConnectionsDictionary,
  (active, connections) => {
    return active.map(id => connections[id])[0];
  }
);

export const selectWsConnections = createSelector(
  selectWsConnectionsDictionary,
  connections => Object
    .values(connections)
    .filter(isNotUndefined)
    .sort((a, b) => a.id.localeCompare(b.id))
);