import { createSelector } from 'reselect';
import { selectControlState } from '../../store/selectors';

const selectEventLogState = createSelector(
  selectControlState,
  control => control.eventLog
);

export const selectShowEventDetails = createSelector(
  selectEventLogState,
  eventLog => eventLog.showEventDetails
);

export const selectToggledEventIds = createSelector(
  selectEventLogState,
  eventLog => eventLog.toggledEventIds
);