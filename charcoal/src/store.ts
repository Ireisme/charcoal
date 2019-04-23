import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { homeReducer } from "./home/store/reducers";

const rootReducer = combineReducers({
  home: homeReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {

  const store = createStore(
    rootReducer,
    composeWithDevTools()
  );

  return store;
}