import { createSelector } from "reselect";

export const isSignedIn = createSelector(
  (state) => state.app,
  (app) => app.mnemonic.length > 0,
);

export const getData = createSelector(
  (state) => state.app,
  (app) => app.data,
);

export const getMnemonic = createSelector(
  (state) => state.app,
  (app) => app.mnemonic,
);

const selectors = {
  isSignedIn,
  getData,
  getMnemonic,
};

export default selectors;
