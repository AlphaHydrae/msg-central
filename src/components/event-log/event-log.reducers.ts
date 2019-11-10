import { without } from 'lodash';
import { combineReducers } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { hideEventDetails, showEventDetails } from './event-log.actions';
import { EventLogState, initialEventLogState } from './event-log.state';

const expandedEventIdsReducer = reducerWithInitialState(initialEventLogState.expandedEventIds)

  .case(
    hideEventDetails,
    (state, payload) => without(state, payload.id)
  )

  .case(
    showEventDetails,
    (state, payload) => [ ...state, payload.id ]
  )

;

export const eventLogReducer = combineReducers<EventLogState>({
  expandedEventIds: expandedEventIdsReducer
});