import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';

import { selectWampConnectionState } from '../../concerns/data/data.selectors';
import { isWampAuthMethod } from '../../domain/wamp/wamp-auth-params';
import { AppState } from '../../store/state';
import { isPresent, isUrlString } from '../../utils/validations';
import { disconnectFromWampRouter, editWampConnectionForm, submitWampConnectionForm } from './wamp.actions';
import { WampPage, WampPageDispatchProps, WampPageStateProps } from './wamp.component';
import { selectWampPageConnectionForm } from './wamp.selectors';

const mapStateToProps: MapStateToProps<WampPageStateProps, {}, AppState> = (state: AppState) => {
  const connectionParams = selectWampPageConnectionForm(state);
  return {
    connection: selectWampConnectionState(state),
    form: connectionParams,
    validations: {
      authIdPresent: connectionParams.authMethod === null || isPresent(connectionParams.authId),
      authTicketPresent: connectionParams.authMethod !== 'ticket' || isPresent(connectionParams.authTicket),
      realmPresent: isPresent(connectionParams.realm),
      routerUrlPresent: isPresent(connectionParams.routerUrl),
      routerUrlValid: connectionParams.routerUrl === '' || isUrlString(connectionParams.routerUrl, [ 'ws:', 'wss:' ])
    }
  };
};

const mapDispatchToProps: MapDispatchToProps<WampPageDispatchProps, {}> = (dispatch: Dispatch) => ({
  connect: event => {
    event.preventDefault();
    return dispatch(submitWampConnectionForm());
  },
  disconnect: () => dispatch(disconnectFromWampRouter()),
  editAuthId: event => dispatch(editWampConnectionForm({ authId: event.currentTarget.value })),
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