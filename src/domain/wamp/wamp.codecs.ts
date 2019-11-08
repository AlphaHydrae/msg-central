import * as t from 'io-ts';

export const WampSubscriptionCodec = t.interface({
  id: t.string,
  topic: t.string
});