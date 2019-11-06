import { Action } from 'redux';
import { StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { actionCreatorFactory } from 'typescript-fsa';

import { ActionType } from '../store/actions';
import { AppEpicDependencies } from '../store/epics';
import { AppState } from '../store/state';

export type Epic = (
  action$: Observable<Action>,
  state$: StateObservable<AppState>,
  dependencies: AppEpicDependencies
) => Observable<Action>;

export const createEpic = (func: Epic) => func;

const factory = actionCreatorFactory();

const registeredActionTypes: string[] = [];

export const createAction = <Payload = void>(type: ActionType) => {
  return factory<Payload>(registerActionType(type));
};

function registerActionType(type: string) {
  if (registeredActionTypes.includes(type)) {
    throw new Error(`Action type "${type}" has already been registered`);
  }

  registeredActionTypes.push(type);
  return type;
}