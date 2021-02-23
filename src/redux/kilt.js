import mirrorCreator from "mirror-creator";
import { createActions, handleActions } from "redux-actions";

const types = mirrorCreator([
  "SET_MNEMONIC",
  "SET_BALANCE",
  "GENERATE_IDENTITY",
  "GET_BALANCE",
]);

export const creators = createActions(
  types.SET_MNEMONIC,
  types.SET_BALANCE,
  types.GENERATE_IDENTITY,
  types.GET_BALANCE,
);

export const initialState = {
  mnemonic: { mnemonic: "", identity: {} },
  balance: 0,
};

export const reducer = handleActions(
  {
    [types.SET_MNEMONIC]: (state, { payload: mnemonic }) =>
      Object.freeze({
        ...state,
        mnemonic,
      }),
    [types.SET_BALANCE]: (state, { payload: balance }) =>
      Object.freeze({
        ...state,
        balance,
      }),
  },
  initialState,
);

export const kiltTypes = types;

export default creators;
