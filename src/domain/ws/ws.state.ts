export interface WsConnectionParams {
  readonly id: string;
  readonly serverUrl: string;
}

export interface WsMessage {
  readonly text: unknown;
}