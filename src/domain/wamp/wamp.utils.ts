import { createEvent } from '../events/events.utils';
import { WampEventBase } from './wamp.events';

export function createWampEvent<T extends object>(value: T): T & WampEventBase {
  return {
    ...createEvent(value),
    protocol: 'wamp'
  };
}