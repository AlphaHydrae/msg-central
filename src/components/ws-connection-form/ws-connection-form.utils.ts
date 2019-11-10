import uuid from 'uuid/v4';

import { WsConnectionParams } from '../../domain/ws/ws.state';
import { WsConnectionFormState } from './ws-connection-form.state';

export function wsConnectionFormToParams(form: WsConnectionFormState): WsConnectionParams {
  return {
    id: uuid(),
    serverUrl: form.serverUrl
  };
}