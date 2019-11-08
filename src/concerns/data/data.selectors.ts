import { createSelector } from 'reselect';

import { selectDataState } from '../../store/selectors';

export const selectEvents = createSelector(
  selectDataState,
  data => data.events
);

export const selectEventsFromMostRecent = createSelector(
  selectEvents,
  events => events.slice().reverse()
);

export const selectWampConnectionState = createSelector(
  selectDataState,
  data => data.wampConnection || undefined
);