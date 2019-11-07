import { createSelector } from 'reselect';

import { selectDataState } from '../../store/selectors';

export const selectWampConnectionState = createSelector(
  selectDataState,
  data => data.wampConnection
);