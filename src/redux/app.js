import mirrorCreator from "mirror-creator";
import { createActions, handleActions } from "redux-actions";

const types = mirrorCreator([
  "ADD_DATA_ENTRY",
  "REMOVE_DATA_ENTRY",
  "GENERATE_IDENTITY",
  "STARTUP",
  "SET_MNEMONIC",
  "SET_DATA",
]);

export const creators = createActions(
  types.ADD_DATA_ENTRY,
  types.REMOVE_DATA_ENTRY,
  types.GENERATE_IDENTITY,
  types.STARTUP,
  types.SET_MNEMONIC,
  types.SET_DATA,
);

export const initialState = {
  mnemonic: "",
  data: [],
};

export const reducer = handleActions(
  {
    [types.SET_MNEMONIC]: (state, { payload: mnemonic }) => (
      Object.freeze({
        ...state,
        mnemonic,
      })
    ),
    [types.SET_DATA]: (state, { payload: data }) => (
      Object.freeze({
        ...state,
        data: [
          ...data,
        ],
      })
    ),
  },
  initialState,
);

export const appTypes = types;

export default creators;
