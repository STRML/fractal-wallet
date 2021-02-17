import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { reducer as appReducer } from "@redux/app";

const rootReducer = combineReducers({
  app: appReducer,
});

const store = (alias) => {
  return createStore(rootReducer,
    applyMiddleware(
      alias,
      thunk,
    )
  );
}

export default store;
