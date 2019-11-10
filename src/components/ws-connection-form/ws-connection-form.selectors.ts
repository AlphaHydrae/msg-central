import { createSelector } from 'reselect';

import { createCommunicationActionInProgressSelector } from '../../concerns/comm/comm.utils';
import { connectToWsServer } from '../../domain/ws/ws.actions';
import { selectControlState } from '../../store/selectors';

export const selectWsConnectionFormState = createSelector(
  selectControlState,
  control => control.wsConnectionForm
);

export const selectConnectingToWsServer = createCommunicationActionInProgressSelector(connectToWsServer);