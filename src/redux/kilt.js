import mirrorCreator from "mirror-creator";
import { createActions, handleActions } from "redux-actions";

import CredentialsCollection from "@models/Credential/CredentialsCollection";

const types = mirrorCreator([
  "ADD_CREDENTIAL",
  "CREATE_CREDENTIAL",
  "GENERATE_IDENTITY",
  "SET_BALANCE",
  "SET_MNEMONIC",
  "SET_CREDENTIALS",
  "REMOVE_CREDENTIAL",
]);

export const creators = createActions(
  types.ADD_CREDENTIAL,
  types.CREATE_CREDENTIAL,
  types.GENERATE_IDENTITY,
  types.SET_BALANCE,
  types.SET_MNEMONIC,
  types.SET_CREDENTIALS,
  types.REMOVE_CREDENTIAL,
);

export const initialState = {
  mnemonic: { mnemonic: "", identity: {} },
  balance: 0,
  credentials: new CredentialsCollection(),
};

export const reducer = handleActions(
  {
    [types.SET_BALANCE]: (state, { payload: balance }) =>
      Object.freeze({
        ...state,
        balance,
      }),
    [types.SET_CREDENTIALS]: (state, { payload: credentials }) =>
      Object.freeze({
        ...state,
        credentials,
      }),
    [types.SET_MNEMONIC]: (state, { payload: mnemonic }) =>
      Object.freeze({
        ...state,
        mnemonic,
      }),
  },
  initialState,
);

export const kiltTypes = types;

export default creators;
