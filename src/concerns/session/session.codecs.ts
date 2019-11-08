import * as t from 'io-ts';

import { WampConnectionFormCodec } from '../../components/wamp-connection-form/wamp-connection-form.codecs';

export const SessionStateCodec = t.interface({
  wampConnectionForm: WampConnectionFormCodec
});