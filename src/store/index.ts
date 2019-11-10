import { routerMiddleware } from 'connected-react-router';
import { AnyAction, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { editWampCallForm } from '../components/wamp-call-form/wamp-call-form.actions';
import { editWampConnectionForm } from '../components/wamp-connection-form/wamp-connection-form.actions';
import { editWampSubscriptionForm } from '../components/wamp-subscription-form/wamp-subscription-form.actions';
import { editWsConnectionForm } from '../components/ws-connection-form/ws-connection-form.actions';
import { AppEpicDependencies, rootEpic } from './epics';
import { history } from './history';
import { rootReducer } from './reducers';
import { AppState } from './state';
import { createStorageLoadingMiddleware, createStorageMiddleware } from './storage';

const silentActionTypes = [
  editWampCallForm,
  editWampConnectionForm,
  editWampSubscriptionForm,
  editWsConnectionForm
].map(creator => creator.type);

export function configureStore() {

  const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState, AppEpicDependencies>({
    dependencies: {
      wamp: new Map(),
      ws: new Map()
    }
  });

  const logger = createLogger({
    collapsed: true,
    predicate: (_, action) => !silentActionTypes.includes(action.type)
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history)),
      applyMiddleware(createStorageLoadingMiddleware()),
      applyMiddleware(epicMiddleware),
      applyMiddleware(createStorageMiddleware()),
      applyMiddleware(logger)
    )
  );

  epicMiddleware.run(rootEpic);

  return store;
}