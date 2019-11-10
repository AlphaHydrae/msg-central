import { connect, MapStateToProps } from 'react-redux';

import { selectEventsFromMostRecent } from '../../concerns/data/data.selectors';
import { AppState } from '../../store/state';
import { EventLog, EventLogOwnProps, EventLogStateProps } from './event-log.component';
import { selectExpandedEventIds } from './event-log.selectors';

const mapStateToProps: MapStateToProps<EventLogStateProps, EventLogOwnProps, AppState> = (state, ownProps) => {
  const events = selectEventsFromMostRecent(state);
  return {
    events: ownProps.filter ? events.filter(ownProps.filter) : events,
    expandedEventIds: selectExpandedEventIds(state)
  };
};

const mapDispatchToProps = () => ({});

export const EventLogContainer = connect(mapStateToProps, mapDispatchToProps)(EventLog);