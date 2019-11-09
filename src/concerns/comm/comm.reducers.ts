import { reject } from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { connectToWampRouter, handleWampConnectionClosed, subscribeToWampTopic, unsubscribeFromWampTopic } from '../../domain/wamp/wamp.actions';
import { registeredAsyncActions } from '../../utils/store';
import { initialCommunicationState } from './comm.state';
import { completionActionHasSameParams, getCompletionCreators, isCompletionAction } from './comm.utils';

export const communicationReducer = reducerWithInitialState(initialCommunicationState)

  .casesWithAction(
    registeredAsyncActions.map(creator => creator.started),
    (state, action) => [ ...state, action ]
  )

  .casesWithAction(
    getCompletionCreators(registeredAsyncActions),
    (state, action) => state.filter(
      ongoing => !isCompletionAction(ongoing, action) || !completionActionHasSameParams(ongoing, action)
    )
  )

  .case(
    handleWampConnectionClosed,
    state => reject(
      state,
      comm =>
        comm.type === connectToWampRouter.started.type ||
        comm.type === subscribeToWampTopic.started.type ||
        comm.type === unsubscribeFromWampTopic.started.type
    )
  )

;