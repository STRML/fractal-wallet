import { createStore, combineReducers } from 'redux';

import { reducer as appReducer } from './app';

const rootReducer = combineReducers({
  app: appReducer,
});

const store = () => createStore(rootReducer);

export default store;
