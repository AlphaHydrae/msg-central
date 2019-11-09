import { createSelector } from 'reselect';

import { selectControlState } from '../../store/selectors';

export const selectWampSubscriptionFormState = createSelector(
  selectControlState,
  control => control.wampSubscriptionForm
);