import * as t from 'io-ts';

export const WampConnectionFormCodec = t.interface({
  routerUrl: t.string,
  realm: t.string,
  namespace: t.string,
  authMethod: t.union([ t.literal('ticket'), t.null ]),
  authId: t.string,
  authTicket: t.string,
  saveAuth: t.boolean
});