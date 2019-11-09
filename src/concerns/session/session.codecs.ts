import * as t from 'io-ts';

import { WampConnectionParamsCodec, WampSubscriptionParamsCodec } from '../../domain/wamp/wamp.codecs';

export const SessionStateCodec = t.interface({
  wampConnections: t.record(t.string, WampConnectionParamsCodec),
  wampSubscriptions: t.record(t.string, WampSubscriptionParamsCodec)
});