import uuid from 'uuid/v4';

import { AppEventBase } from './events.state';

export function createEvent<T extends object>(value: T): T & AppEventBase {
  return {
    ...value,
    id: uuid(),
    time: new Date().toISOString()
  };
}