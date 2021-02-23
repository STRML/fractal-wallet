import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { reducer as kiltReducer } from "@redux/kilt";

const rootReducer = combineReducers({
  kilt: kiltReducer,
});

const store = (alias) => {
  return createStore(rootReducer, applyMiddleware(alias, thunk));
};

export default store;
