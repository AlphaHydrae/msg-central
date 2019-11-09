import { Success } from 'typescript-fsa';

import { createEvent } from '../events/events.utils';
import { WampEventBase } from './wamp.events';
import { WampSubscriptionParams } from './wamp.state';

export function createWampEvent<T extends object>(value: T): T & WampEventBase {
  return {
    ...createEvent(value),
    protocol: 'wamp'
  };
}

export function getNewWampSubscriptionKey(payload: Success<WampSubscriptionParams, any>) {
  return `${payload.params.connectionId}/${payload.result}`;
}

export function getWampSubscriptionKey(subscription: WampSubscriptionParams) {
  return `${subscription.connectionId}/${subscription.id}`;
}