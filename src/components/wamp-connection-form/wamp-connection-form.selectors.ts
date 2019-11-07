import { createSelector } from 'reselect';

import { selectSessionState } from '../../store/selectors';
import { wampConnectionFormToParams } from './wamp-connection-form.utils';

export const selectWampConnectionFormState = createSelector(
  selectSessionState,
  session => session.wampConnectionForm
);

export const selectWampConnectionFormParams = createSelector(
  selectWampConnectionFormState,
  wampConnectionFormToParams
);