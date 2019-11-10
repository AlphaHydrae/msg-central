import * as t from 'io-ts';

export const WampTicketAuthParamsCodec = t.interface({
  id: t.string,
  method: t.literal('ticket'),
  ticket: t.string
});

export const WampConnectionParamsCodec = t.interface({
  auth: t.union([ WampTicketAuthParamsCodec, t.undefined ]),
  id: t.string,
  routerUrl: t.string,
  realm: t.string,
  namespace: t.union([ t.string, t.undefined ])
});

export const WampSubscriptionParamsCodec = t.interface({
  connectionId: t.string,
  id: t.string,
  topic: t.string
});

export const WampTopicEventDetailsCodec = t.interface({
  topic: t.string
});