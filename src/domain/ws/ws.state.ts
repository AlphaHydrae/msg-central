export type WsMessage = WsTextMessage;

export interface WsConnectionParams {
  readonly id: string;
  readonly serverUrl: string;
}

export interface WsTextMessage {
  readonly type: 'text';
  readonly data: string;
}