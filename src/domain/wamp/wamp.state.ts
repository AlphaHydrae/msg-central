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

export type WampSubscriptionStatus = 'subscribed' | 'subscribing' | 'unsubscribed' | 'unsubscribing';

export interface WampTopicEvent {
  readonly args: unknown[];
  readonly kwargs: unknown;
  readonly details: unknown;
}