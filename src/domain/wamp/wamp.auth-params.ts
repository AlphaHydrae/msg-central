export type WampAuthParams = WampTicketAuthParams;

export interface WampTicketAuthParams {
  readonly method: 'ticket';
  readonly id: string;
  readonly ticket: string;
}

const wampAuthMethods = [ 'ticket' ];

export function isWampAuthMethod(value: unknown): value is WampAuthParams['method'] {
  return typeof value === 'string' && wampAuthMethods.includes(value);
}