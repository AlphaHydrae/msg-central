import { connect, MapDispatchToProps, MapStateToProps, MergeProps } from 'react-redux';

import { AppState } from '../../store/state';
import { hideEventDetails, showEventDetails } from '../event-log/event-log.actions';
import { selectShowEventDetails, selectToggledEventIds } from '../event-log/event-log.selectors';
import { EventLineComponent, EventLineDispatchProps, EventLineOwnProps, EventLineProps, EventLineStateProps } from './event-line.component';

const mapStateToProps: MapStateToProps<EventLineStateProps, EventLineOwnProps, AppState> = (state, ownProps) => {

  const show = selectShowEventDetails(state);
  const toggled = selectToggledEventIds(state).includes(ownProps.event.id);

  return {
    expanded: show ? !toggled : toggled
  };
};

const mapDispatchToProps: MapDispatchToProps<EventLineDispatchProps, EventLineOwnProps> = (dispatch, ownProps) => ({
  hide: () => dispatch(hideEventDetails(ownProps.event.id)),
  show: () => dispatch(showEventDetails(ownProps.event.id))
});

const mergeProps: MergeProps<
  EventLineStateProps,
  EventLineDispatchProps,
  EventLineOwnProps,
  EventLineProps
> = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  toggle: () => stateProps.expanded ? dispatchProps.hide() : dispatchProps.show()
});

export const EventLineContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EventLineComponent);