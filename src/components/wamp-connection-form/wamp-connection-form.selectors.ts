import { createSelector } from 'reselect';

import { selectControlState } from '../../store/selectors';

export const selectWampConnectionFormState = createSelector(
  selectControlState,
  control => control.wampConnectionForm
);