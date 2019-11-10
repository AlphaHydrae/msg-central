import { createSelector } from 'reselect';
import { selectControlState } from '../../store/selectors';

const selectEventLogState = createSelector(
  selectControlState,
  control => control.eventLog
);

export const selectExpandedEventIds = createSelector(
  selectEventLogState,
  eventLog => eventLog.expandedEventIds
);