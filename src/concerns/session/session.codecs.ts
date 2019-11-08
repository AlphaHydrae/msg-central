import * as t from 'io-ts';

import { WampConnectionFormCodec } from '../../components/wamp-connection-form/wamp-connection-form.codecs';
import { WampSubscriptionCodec } from '../../domain/wamp/wamp.codecs';

export const SessionStateCodec = t.interface({
  wampConnectionForm: WampConnectionFormCodec,
  wampSubscriptions: t.record(t.string, WampSubscriptionCodec)
});