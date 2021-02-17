import mirrorCreator from "mirror-creator";
import { createActions, handleActions } from "redux-actions";

const types = mirrorCreator([
    "GENERATE_IDENTITY",
    "SET_MNEMONIC"
]);

export const creators = createActions(
    types.GENERATE_IDENTITY,
    types.SET_MNEMONIC,
);

export const initialState = {
    mnemonic: "",
};

export const reducer = handleActions(
    {
        [types.SET_MNEMONIC]: (state, { payload: mnemonic }) => (
            Object.freeze({
                ...state,
                mnemonic,
            })
        )
    },
    initialState,
);

export const appTypes = types;

export default creators;
