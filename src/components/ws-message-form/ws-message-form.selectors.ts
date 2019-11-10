import { createSelector } from 'reselect';

import { selectControlState } from '../../store/selectors';

export const selectWsMessageFormState = createSelector(
  selectControlState,
  control => control.wsMessageForm
);