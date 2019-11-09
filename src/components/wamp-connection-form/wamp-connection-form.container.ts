import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { isWampAuthMethod } from '../../domain/wamp/wamp.auth-params';
import { selectConnectingToWampRouter } from '../../domain/wamp/wamp.selectors';
import { AppState } from '../../store/state';
import { preventDefault } from '../../utils/forms';
import { isBlank, isUrlString } from '../../utils/validations';
import { editWampConnectionForm, submitWampConnectionForm } from './wamp-connection-form.actions';
import { WampConnectionForm, WampConnectionFormDispatchProps, WampConnectionFormStateProps } from './wamp-connection-form.component';
import { selectWampConnectionFormState } from './wamp-connection-form.selectors';

const mapStateToProps: MapStateToProps<WampConnectionFormStateProps, {}, AppState> = state => {
  const connectionParams = selectWampConnectionFormState(state);
  return {
    connecting: selectConnectingToWampRouter(state),
    form: connectionParams,
    validations: {
      authId: {
        required: connectionParams.authMethod !== null && isBlank(connectionParams.authId)
      },
      authTicket: {
        required: connectionParams.authMethod === 'ticket' && isBlank(connectionParams.authTicket)
      },
      realm: {
        required: isBlank(connectionParams.realm)
      },
      routerUrl: {
        required: isBlank(connectionParams.routerUrl),
        valid: !isUrlString(connectionParams.routerUrl, [ 'ws:', 'wss:' ])
      }
    }
  };
};

const mapDispatchToProps: MapDispatchToProps<WampConnectionFormDispatchProps, {}> = dispatch => ({
  connect: preventDefault(() => dispatch(submitWampConnectionForm())),
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

export const WampConnectionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WampConnectionForm);