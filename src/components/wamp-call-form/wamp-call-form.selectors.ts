import { createSelector } from 'reselect';

import { createCommunicationActionInProgressSelector } from '../../concerns/comm/comm.utils';
import { callWampProcedure } from '../../domain/wamp/wamp.actions';
import { selectControlState } from '../../store/selectors';

export const selectWampCallFormState = createSelector(
  selectControlState,
  control => control.wampCallForm
);

export const selectWampCallInProgress = createCommunicationActionInProgressSelector(callWampProcedure);