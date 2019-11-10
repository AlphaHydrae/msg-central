import { Action } from 'redux';

export interface ActiveWampSubscription {
  readonly connectionId: string;
  readonly id: string;
}

export interface AppEvent<A extends Action> {
  readonly action: A;
  readonly id: string;
  readonly time: string;
}

export interface DataState {
  readonly activeWampConnections: string[];
  readonly activeWampSubscriptions: ActiveWampSubscription[];
  readonly events: Array<AppEvent<any>>;
}

export const initialDataState: DataState = {
  activeWampConnections: [],
  activeWampSubscriptions: [],
  events: []
};