import { connect, MapDispatchToProps, MapStateToProps, MergeProps } from 'react-redux';

import { selectEventsFromMostRecent } from '../../concerns/data/data.selectors';
import { AppState } from '../../store/state';
import { setShowAllEventDetails } from './event-log.actions';
import { EventLog, EventLogDispatchProps, EventLogOwnProps, EventLogProps, EventLogStateProps } from './event-log.component';
import { selectShowEventDetails } from './event-log.selectors';

const mapStateToProps: MapStateToProps<EventLogStateProps, EventLogOwnProps, AppState> = (state, ownProps) => {
  const events = selectEventsFromMostRecent(state);
  return {
    events: ownProps.filter ? events.filter(ownProps.filter) : events,
    showEventDetails: selectShowEventDetails(state)
  };
};

const mapDispatchToProps: MapDispatchToProps<EventLogDispatchProps, EventLogOwnProps> = dispatch => ({
  setShowEventDetails: value => dispatch(setShowAllEventDetails(value))
});

const mergeProps: MergeProps<
  EventLogStateProps,
  EventLogDispatchProps,
  EventLogOwnProps,
  EventLogProps
> = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onToggleShowEventDetails: () => dispatchProps.setShowEventDetails(!stateProps.showEventDetails)
});

export const EventLogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EventLog);