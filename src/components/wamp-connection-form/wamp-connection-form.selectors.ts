import { createSelector } from 'reselect';

import { selectControlState } from '../../store/selectors';
import { wampConnectionFormToParams } from './wamp-connection-form.utils';

export const selectWampConnectionFormState = createSelector(
  selectControlState,
  session => session.wampConnectionForm
);

export const selectWampConnectionFormParams = createSelector(
  selectWampConnectionFormState,
  wampConnectionFormToParams
);