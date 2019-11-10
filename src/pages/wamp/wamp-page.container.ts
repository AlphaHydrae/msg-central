import { connect, MapStateToProps } from 'react-redux';

import { AppState } from '../../store/state';
import { wampEventActionTypes } from './wamp-page.actions';
import { WampPageComponent, WampPageProps } from './wamp-page.component';

const mapStateToProps: MapStateToProps<WampPageProps, {}, AppState> = () => ({
  eventLogFilter: event => wampEventActionTypes.includes(event.action.type)
});

const mapDispatchToProps = () => ({});

export const WampPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WampPageComponent);