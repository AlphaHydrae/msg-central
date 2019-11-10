import * as t from 'io-ts';

export const WsConnectionParamsCodec = t.interface({
  id: t.string,
  serverUrl: t.string
});