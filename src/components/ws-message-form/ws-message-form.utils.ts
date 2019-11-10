import uuid from 'uuid/v4';

import { SendWsMessageParams } from '../../domain/ws/ws.actions';
import { WsConnectionParams } from '../../domain/ws/ws.state';
import { WsMessageFormState } from './ws-message-form.state';

export function wsMessageFormToParams(form: WsMessageFormState, connection: WsConnectionParams): SendWsMessageParams {
  return {
    connectionId: connection.id,
    id: uuid(),
    message: {
      type: 'text',
      data: form.data
    }
  };
}