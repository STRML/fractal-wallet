import { createSelector } from "reselect";

export const isSignedIn = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.mnemonic.mnemonic.length > 0,
);

export const getBalance = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.balance,
);

export const getCredentials = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.credentials,
);

export const getData = createSelector(
  (state) => state.data,
  (data) => data.data,
);

export const getIdentity = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.mnemonic.identity,
);

export const getMnemonic = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.mnemonic.mnemonic,
);

const selectors = {
  isSignedIn,
  getBalance,
  getCredentials,
  getData,
  getIdentity,
  getMnemonic,
};

export default selectors;
