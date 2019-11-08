import { WampConnectionParams } from './wamp.connection-params';

export interface WampConnectionState {
  readonly connected: boolean;
  readonly params: WampConnectionParams;
}

export interface WampError {
  readonly type: WampErrorType;
  readonly error: unknown;
  readonly customErrorMessage: unknown;
}

export type WampErrorType = 'internalError' | 'userError';

export interface WampSubscription {
  readonly id: string;
  readonly topic: string;
}

export interface WampTopicEvent {
  readonly args: unknown[];
  readonly kwargs: unknown;
  readonly details: unknown;
}