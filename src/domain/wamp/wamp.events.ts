import { AppEventBase } from '../events/events.state';
import { WampConnectionParams } from './wamp.connection-params';
import { WampSubscription } from './wamp.state';

export interface WampEventBase extends AppEventBase {
  readonly protocol: 'wamp';
}

export interface WampConnectionClosed extends WampEventBase {
  readonly type: 'wampConnectionClosed';
  readonly params: WampConnectionParams;
  readonly details: unknown;
  readonly reason: string;
}

export interface WampConnectionOpen extends WampEventBase {
  readonly type: 'wampConnectionOpen';
  readonly params: WampConnectionParams;
}

export interface WampTopicSubscribed extends WampEventBase {
  readonly type: 'wampTopicSubscribed';
  readonly subscription: WampSubscription;
}

export interface WampTopicUnsubscribed extends WampEventBase {
  readonly type: 'wampTopicUnsubscribed';
  readonly subscription: WampSubscription;
}

export type WampEvent =
  WampConnectionClosed |
  WampConnectionOpen |
  WampTopicSubscribed |
  WampTopicUnsubscribed
;