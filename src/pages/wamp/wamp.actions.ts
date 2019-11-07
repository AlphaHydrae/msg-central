import { WampConnectionParams } from '../../domain/wamp/wamp-connection-params';
import { createAction, createAsyncAction } from '../../utils/store';
import { WampPageConnectionFormState } from './wamp.state';

export interface WampConnectionError {
  readonly reason: string;
  readonly details: unknown;
}

export const connectToWampRouter = createAsyncAction<WampConnectionParams, void, WampConnectionError>('CONNECT_TO_WAMP_ROUTER');
export const disconnectFromWampRouter = createAction('DISCONNECT_FROM_WAMP_ROUTER');
export const editWampConnectionForm = createAction<Partial<WampPageConnectionFormState>>('EDIT_WAMP_CONNECTION_FORM');
export const handleWampConnectionClosed = createAction('HANDLE_WAMP_CONNECTION_CLOSED');
export const submitWampConnectionForm = createAction('SUBMIT_WAMP_CONNECTION_FORM');