import { connect, MapStateToProps } from 'react-redux';

import { selectEventsFromMostRecent } from '../../concerns/data/data.selectors';
import { AppState } from '../../store/state';
import { EventLog, EventLogStateProps } from './event-log.component';
import { selectExpandedEventIds } from './event-log.selectors';

const mapStateToProps: MapStateToProps<EventLogStateProps, {}, AppState> = state => ({
  events: selectEventsFromMostRecent(state),
  expandedEventIds: selectExpandedEventIds(state)
});

const mapDispatchToProps = () => ({});

export const EventLogContainer = connect(mapStateToProps, mapDispatchToProps)(EventLog);