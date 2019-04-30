import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { homeReducer } from "./home/store/reducers";
import { authReducer } from "./auth/store/reducers";
import { sitesReducer } from "./sites/store/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  sites: sitesReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    rootReducer,
    composedEnhancers
  );

  return store;
}