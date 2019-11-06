import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';

import { isWampAuthMethod } from '../../domain/wamp/wamp-auth-params';
import { AppState } from '../../store/state';
import { isUrlString } from '../../utils/validations';
import { editWampConnectionForm } from './wamp.actions';
import { WampPage, WampPageDispatchProps, WampPageStateProps } from './wamp.component';
import { selectWampPageConnectionParams } from './wamp.selectors';

const mapStateToProps: MapStateToProps<WampPageStateProps, {}, AppState> = (state: AppState) => {
  const connectionParams = selectWampPageConnectionParams(state);
  return {
    connectionParams,
    validations: {
      routerUrlValid: connectionParams.routerUrl === '' || isUrlString(connectionParams.routerUrl, [ 'ws:', 'wss:' ])
    }
  };
};

const mapDispatchToProps: MapDispatchToProps<WampPageDispatchProps, {}> = (dispatch: Dispatch) => ({
  editAuthMethod: event => dispatch(editWampConnectionForm({
    authMethod: isWampAuthMethod(event.currentTarget.value) ? event.currentTarget.value : null
  })),
  editAuthTicket: event => dispatch(editWampConnectionForm({ authTicket: event.currentTarget.value })),
  editNamespace: event => dispatch(editWampConnectionForm({ namespace: event.currentTarget.value })),
  editRealm: event => dispatch(editWampConnectionForm({ realm: event.currentTarget.value })),
  editRouterUrl: event => dispatch(editWampConnectionForm({ routerUrl: event.currentTarget.value })),
  editSaveAuth: event => dispatch(editWampConnectionForm({ saveAuth: event.currentTarget.checked }))
});

export const WampPageContainer = connect<WampPageStateProps, WampPageDispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(WampPage);