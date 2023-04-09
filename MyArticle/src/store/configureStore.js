import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {createReducerManager} from './reducerManager';
import article from './article';
import userDetails from './userDetails';

const initialReducers = {
  article,
  userDetails,
};

export default function configureStore(preloadedState) {
  const reducerManager = createReducerManager(initialReducers);

  const store = createStore(
    reducerManager.reduce,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  store.reducerManager = reducerManager;

  return store;
}
