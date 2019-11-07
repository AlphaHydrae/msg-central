import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { createAction, createAsyncAction } from '../../utils/store';
import { WampConnectionFormState } from './wamp-connection-form.state';

export interface WampConnectionError {
  readonly reason: string;
  readonly details: unknown;
}

export const connectToWampRouter = createAsyncAction<WampConnectionParams, void, WampConnectionError>('CONNECT_TO_WAMP_ROUTER');
export const editWampConnectionForm = createAction<Partial<WampConnectionFormState>>('EDIT_WAMP_CONNECTION_FORM');
export const submitWampConnectionForm = createAction('SUBMIT_WAMP_CONNECTION_FORM');