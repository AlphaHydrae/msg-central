import uuid from 'uuid/v4';

import { WampAuthParams } from '../../domain/wamp/wamp.auth-params';
import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { WampConnectionFormState } from './wamp-connection-form.state';

export function wampConnectionFormToParams(form: WampConnectionFormState): WampConnectionParams {

  let auth: WampAuthParams | undefined;
  if (form.authMethod === 'ticket') {
    auth = {
      id: form.authId,
      method: 'ticket',
      ticket: form.authTicket
    };
  }

  return {
    auth,
    id: uuid(),
    namespace: form.namespace || undefined,
    realm: form.realm,
    routerUrl: form.routerUrl,
    saveAuth: form.saveAuth
  };
}