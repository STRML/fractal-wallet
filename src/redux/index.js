import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import watcher from "./middleware/watcher";

import { reducer as appReducer } from "@redux/app";
import { reducer as dataReducer } from "@redux/data";
import { reducer as kiltReducer } from "@redux/kilt";
import { reducer as requestsReducer } from "@redux/requests";

const rootReducer = combineReducers({
  app: appReducer,
  data: dataReducer,
  kilt: kiltReducer,
  requests: requestsReducer,
});

const store = (alias) =>
  createStore(rootReducer, applyMiddleware(watcher, alias, thunk));

export default store;
