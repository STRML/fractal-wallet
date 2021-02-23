import { createSelector } from "reselect";

export const isSignedIn = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.mnemonic.mnemonic.length > 0,
);

export const getData = createSelector(
  (state) => state.app,
  (app) => app.data,
);

export const getMnemonic = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.mnemonic.mnemonic,
);

export const getIdentity = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.mnemonic.identity,
);

export const getBalance = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.balance,
);

const selectors = {
  isSignedIn,
  getData,
  getMnemonic,
  getIdentity,
  getBalance,
};

export default selectors;
