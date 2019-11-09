import { WampEvent } from '../../domain/wamp/wamp.events';

export type AppEvent = WampEvent;

export interface DataState {
  readonly activeWampConnections: string[];
  readonly events: AppEvent[];
}

export const initialDataState: DataState = {
  activeWampConnections: [],
  events: []
};