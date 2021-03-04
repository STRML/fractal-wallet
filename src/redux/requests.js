import mirrorCreator from "mirror-creator";
import { createActions, handleActions } from "redux-actions";

const types = mirrorCreator([
  "ADD_REQUEST",
  "ACCEPT_REQUEST",
  "REQUEST_ACCEPTED",
  "REMOVE_REQUEST",
  "DECLINE_REQUEST",
  "REQUEST_DECLINED",
  "SET_REQUESTS",
]);

export const creators = createActions(
  types.ADD_REQUEST,
  types.ACCEPT_REQUEST,
  types.REQUEST_ACCEPTED,
  types.REMOVE_REQUEST,
  types.DECLINE_REQUEST,
  types.REQUEST_DECLINED,
  types.SET_REQUESTS,
);

export const initialState = {
  requests: "[]",
};

export const reducer = handleActions(
  {
    [types.SET_REQUESTS]: (state, { payload: requests }) =>
      Object.freeze({
        ...state,
        requests: requests.serialize(),
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
    requests: state.requests,
  };
}

export const requestsTypes = types;

export default creators;
