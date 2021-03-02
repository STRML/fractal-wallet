import { createSelector } from "reselect";

import DataCollection from "@background/Data/DataCollection";
import CredentialsCollection from "@background/Kilt/CredentialsCollection";

export const isLaunched = createSelector(
  (state) => state.app,
  (app) => app.launched,
);

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
  (kilt) => CredentialsCollection.parse(kilt.credentials),
);

export const getData = createSelector(
  (state) => state.data,
  (data) => DataCollection.parse(data.data),
);

export const getIdentity = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.mnemonic.identity,
);

export const getMnemonic = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.mnemonic.mnemonic,
);

export const getAddress = createSelector(
  (state) => state.kilt,
  (kilt) => kilt.mnemonic.address,
);

const selectors = {
  isSignedIn,
  getAddress,
  getBalance,
  getCredentials,
  getData,
  getIdentity,
  getMnemonic,
};

export default selectors;
