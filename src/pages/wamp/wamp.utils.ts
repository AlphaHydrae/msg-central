import { WampAuthParams } from '../../domain/wamp/wamp-auth-params';
import { WampConnectionParams } from '../../domain/wamp/wamp-connection-params';
import { WampPageConnectionFormState } from './wamp.state';

export function wampPageConnectionFormToParams(form: WampPageConnectionFormState): WampConnectionParams {

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
    namespace: form.namespace || undefined,
    realm: form.realm,
    routerUrl: form.routerUrl
  };
}