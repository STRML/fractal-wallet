import mirrorCreator from "mirror-creator";
import { createActions, handleActions } from "redux-actions";

const types = mirrorCreator([
  "SET_CREDENTIALS",
  "SET_SELF_ATTESTED_CLAIMS",
  "SET_ATTESTED_CLAIMS",
  "ADD_ATTESTED_CLAIM",
  "FETCH_SELF_ATTESTED_CLAIMS",
]);

export const creators = createActions(
  types.SET_CREDENTIALS,
  types.SET_SELF_ATTESTED_CLAIMS,
  types.SET_ATTESTED_CLAIMS,
  types.ADD_ATTESTED_CLAIM,
  types.FETCH_SELF_ATTESTED_CLAIMS,
);

export const initialState = {
  credentials: "[]",
};

export const reducer = handleActions(
  {
    [types.SET_CREDENTIALS]: (state, { payload: credentials }) =>
      Object.freeze({
        ...state,
        credentials: credentials.serialize(),
      }),
  },
  initialState,
);

export async function restore(state = {}) {
  return {
    ...initialState,
    ...state,
  };
}

export async function store(state) {
  return {
    credentials: state.credentials,
  };
}

export const credentialsTypes = types;

export default creators;
