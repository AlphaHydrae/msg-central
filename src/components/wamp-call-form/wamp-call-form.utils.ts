import uuid from 'uuid/v4';

import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { WampCallParams } from '../../domain/wamp/wamp.state';
import { WampCallFormState } from './wamp-call-form.state';

export function wampCallFormToParams(form: WampCallFormState, connection: WampConnectionParams): WampCallParams {
  return {
    connectionId: connection.id,
    args: form.args ? JSON.parse(form.args) : [],
    id: uuid(),
    kwargs: form.kwargs ? JSON.parse(form.kwargs) : {},
    procedure: `${connection.namespace || ''}${form.procedure}`
  };
}