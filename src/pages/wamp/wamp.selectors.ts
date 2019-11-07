import { createSelector } from 'reselect';

import { selectSessionState } from '../../store/selectors';
import { wampPageConnectionFormToParams } from './wamp.utils';

const selectWampPageState = createSelector(
  selectSessionState,
  session => session.wampPage
);

export const selectWampPageConnectionForm = createSelector(
  selectWampPageState,
  page => page.connectionForm
);

export const selectWampConnectionParams = createSelector(
  selectWampPageConnectionForm,
  wampPageConnectionFormToParams
);