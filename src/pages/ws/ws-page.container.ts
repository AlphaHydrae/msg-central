import { connect, MapStateToProps } from 'react-redux';

import { AppState } from '../../store/state';
import { wsEventActionTypes } from './ws-page.actions';
import { WsPageComponent, WsPageProps } from './ws-page.component';

const mapStateToProps: MapStateToProps<WsPageProps, {}, AppState> = () => ({
  eventLogFilter: event => wsEventActionTypes.includes(event.action.type)
});

const mapDispatchToProps = () => ({});

export const WsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WsPageComponent);