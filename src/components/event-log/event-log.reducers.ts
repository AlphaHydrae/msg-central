import { without } from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { hideEventDetails, setShowAllEventDetails, showEventDetails } from './event-log.actions';
import { initialEventLogState } from './event-log.state';

export const eventLogReducer = reducerWithInitialState(initialEventLogState)

  .case(
    hideEventDetails,
    (state, payload) => ({
      ...state,
      toggledEventIds: state.showEventDetails ? [ ...state.toggledEventIds, payload ] : without(state.toggledEventIds, payload)
    })
  )

  .case(
    showEventDetails,
    (state, payload) => ({
      ...state,
      toggledEventIds: state.showEventDetails ? without(state.toggledEventIds, payload) : [ ...state.toggledEventIds, payload ]
    })
  )

  .case(
    setShowAllEventDetails,
    (_, payload) => ({ showEventDetails: payload, toggledEventIds: initialEventLogState.toggledEventIds })
  )

;