import { createAction, createAsyncAction } from '../../utils/store';
import { WsConnectionParams, WsMessage } from './ws.state';

export interface HandleWsConnectionClosedParams {
  readonly code: number;
  readonly params: WsConnectionParams;
  readonly reason: string;
}

export interface HandleWsMessageParams {
  readonly id: string;
  readonly data: unknown;
}

export interface SendWsMessageParams {
  readonly connectionId: string;
  readonly id: string;
  readonly message: WsMessage;
}

export interface WsClientError {
  readonly message: string;
  readonly name?: string;
  readonly stack?: string;
}

export const connectToWsServer = createAsyncAction<WsConnectionParams, void, WsClientError>('CONNECT_TO_WS_SERVER');
export const deleteWsConnection = createAction<WsConnectionParams>('DELETE_WS_CONNECTION');
export const disconnectFromWsServer = createAction<WsConnectionParams>('DISCONNECT_FROM_WS_SERVER');
export const handleWsConnectionClosed = createAction<HandleWsConnectionClosedParams>('HANDLE_WS_CONNECTION_CLOSED');
export const handleWsMessage = createAction<HandleWsMessageParams>('HANDLE_WS_MESSAGE');
export const sendWsMessage = createAction<SendWsMessageParams>('SEND_WS_MESSAGE');