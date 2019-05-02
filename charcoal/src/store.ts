import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { all } from "redux-saga/effects";
import createSagaMiddleware from "@redux-saga/core";

import { homeReducer } from "./home/store/reducers";
import { authReducer } from "./auth/store/reducers";
import { sitesReducer } from "./sites/store/reducers";

import authSagas from './auth/store/sagas'; 
import siteSagas from './sites/store/sagas';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  sites: sitesReducer
});

function* rootSaga() {
  yield all([
    ...authSagas,
    ...siteSagas
  ]);
} 

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [thunk, sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    rootReducer,
    composedEnhancers
  );

  sagaMiddleware.run(rootSaga);

  return store;
}