import mirrorCreator from "mirror-creator";
import { createActions, handleActions } from "redux-actions";
import DataCollection from "@background/Data/DataCollection";

const types = mirrorCreator([
  "ADD_DATA_ENTRY",
  "REMOVE_DATA_ENTRY",
  "STARTUP",
  "SET_DATA",
]);

export const creators = createActions(
  types.ADD_DATA_ENTRY,
  types.REMOVE_DATA_ENTRY,
  types.STARTUP,
  types.SET_DATA,
);

export const initialState = {
  data: new DataCollection(),
};

export const reducer = handleActions(
  {
    [types.SET_DATA]: (state, { payload: data }) =>
      Object.freeze({
        ...state,
        data,
      }),
  },
  initialState,
);

export const appTypes = types;

export default creators;
