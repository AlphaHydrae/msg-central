import { createSelector } from 'reselect';

import { selectSessionState } from '../../store/selectors';

const selectWampPageState = createSelector(
  selectSessionState,
  session => session.wampPage
);

export const selectWampPageConnectionParams = createSelector(
  selectWampPageState,
  page => page.connectionParams
);