import { createAction, createAsyncAction } from '../../utils/store';
import { WampConnectionParams } from './wamp.connection-params';
import { WampError, WampSubscriptionParams, WampTopicEvent } from './wamp.state';

export interface HandleWampTopicEventParams {
  readonly connectionId: string;
  readonly event: WampTopicEvent;
  readonly subscriptionId: number;
}

export interface WampConnectionClosedParams {
  readonly details: unknown;
  readonly params: WampConnectionParams;
  readonly reason: string;
}

export interface WampConnectionError {
  readonly reason: string;
  readonly details: unknown;
}

export interface WampClientError {
  readonly message: string;
  readonly stack?: string;
  readonly args: unknown[];
  readonly kwargs: unknown;
}

export const connectToWampRouter = createAsyncAction<WampConnectionParams, void, WampConnectionError>('CONNECT_TO_WAMP_ROUTER');
export const deleteWampConnection = createAction<WampConnectionParams>('DELETE_WAMP_CONNECTION');
export const deleteWampTopicSubscription = createAction<WampSubscriptionParams>('DELETE_WAMP_TOPIC_SUBSCRIPTION');
export const disconnectFromWampRouter = createAction<WampConnectionParams>('DISCONNECT_FROM_WAMP_ROUTER');
export const handleWampConnectionClosed = createAction<WampConnectionClosedParams>('HANDLE_WAMP_CONNECTION_CLOSED');
export const handleWampError = createAction<WampError>('HANDLE_WAMP_ERROR');
export const handleWampTopicEvent = createAction<HandleWampTopicEventParams>('HANDLE_WAMP_TOPIC_EVENT');
export const subscribeToWampTopic = createAsyncAction<WampSubscriptionParams, void, WampClientError>('SUBSCRIBE_TO_WAMP_TOPIC');
export const unsubscribeFromWampTopic = createAsyncAction<WampSubscriptionParams, void, WampClientError>('UNSUBSCRIBE_FROM_WAMP_TOPIC');