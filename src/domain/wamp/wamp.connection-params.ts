import { WampAuthParams } from './wamp.auth-params';

export interface WampConnectionParams {
  readonly auth?: WampAuthParams;
  readonly id: string;
  readonly namespace?: string;
  readonly realm: string;
  readonly routerUrl: string;
}