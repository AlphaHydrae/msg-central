import { WampConnectionParams } from '../../domain/wamp/wamp.connection-params';
import { WampSubscription } from '../../domain/wamp/wamp.state';

export interface OpeningWampConnection {
  readonly type: 'openingWampConnection';
  readonly params: WampConnectionParams;
}

export interface SubscribingToWampTopic {
  readonly type: 'subscribingToWampTopic';
  readonly subscription: WampSubscription;
}

export interface UnsubscribingFromWampTopic {
  readonly type: 'unsubscribingFromWampTopic';
  readonly subscription: WampSubscription;
}

export type OngoingCommunication =
  OpeningWampConnection |
  SubscribingToWampTopic |
  UnsubscribingFromWampTopic
;

export type CommunicationState = OngoingCommunication[];

export const initialCommunicationState: CommunicationState = [];