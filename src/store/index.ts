import { routerMiddleware } from 'connected-react-router';
import localforage from 'localforage';
import { pick } from 'lodash';
import { AnyAction, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { editWampConnectionForm } from '../components/wamp-connection-form/wamp-connection-form.actions';
import { AppEpicDependencies, rootEpic } from './epics';
import { history } from './history';
import { rootReducer } from './reducers';
import { AppState } from './state';

const silentActionTypes = [
  editWampConnectionForm
].map(creator => creator.type);

export function configureStore() {

  const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState, AppEpicDependencies>({
    dependencies: {}
  });

  const logger = createLogger({
    collapsed: true,
    predicate: (_, action) => !silentActionTypes.includes(action.type)
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history)),
      applyMiddleware(epicMiddleware),
      applyMiddleware(logger)
    )
  );

  epicMiddleware.run(rootEpic);

  store.subscribe(() => {
    localforage.setItem('store', pick(store.getState(), 'session')).catch(err => console.warn(err));
  });

  return store;
}