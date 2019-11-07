import { connect, MapDispatchToProps } from 'react-redux';

import { isWampAuthMethod } from '../../domain/wamp/wamp.auth-params';
import { AppState } from '../../store/state';
import { isPresent, isUrlString } from '../../utils/validations';
import { editWampConnectionForm, submitWampConnectionForm } from './wamp-connection-form.actions';
import { WampConnectionForm, WampConnectionFormDispatchProps } from './wamp-connection-form.component';
import { selectWampConnectionFormState } from './wamp-connection-form.selectors';

const mapStateToProps = (state: AppState) => {
  const connectionParams = selectWampConnectionFormState(state);
  return {
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

const mapDispatchToProps: MapDispatchToProps<WampConnectionFormDispatchProps, {}> = dispatch => ({
  connect: event => {
    event.preventDefault();
    return dispatch(submitWampConnectionForm());
  },
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