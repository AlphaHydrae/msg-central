export interface WampCallParams {
  readonly args: unknown[];
  readonly connectionId: string;
  readonly id: string;
  readonly kwargs: unknown;
  readonly procedure: string;
}

export interface WampError {
  readonly type: WampErrorType;
  readonly error: unknown;
  readonly customErrorMessage: unknown;
}

export type WampErrorType = 'internalError' | 'userError';

export interface WampSubscriptionParams {
  readonly connectionId: string;
  readonly id: string;
  readonly topic: string;
}

export interface WampTopicEvent {
  readonly args: unknown[];
  readonly kwargs: unknown;
  readonly details: unknown;
}