import { createSelector } from "reselect";

export const getMnemonic = createSelector(
  state => state.app,
  app => app.mnemonic,
);

export const isSignedIn = createSelector(
    state => state.app,
    app => app.mnemonic.length > 0,
);

export default {
    getMnemonic,
    isSignedIn,
};
