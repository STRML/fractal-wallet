import mirrorCreator from 'mirror-creator';
import { createActions, handleActions } from 'redux-actions';

const types = mirrorCreator([
    'STARTUP',
]);

export const creators = createActions(
    types.STARTUP,
);

export const initialState = {};

export const reducer = handleActions(
    {
        [types.STARTUP]: (state, { payload }) => (
            Object.freeze({
                ...state,
            })
        ),
    },
    initialState,
);

export const appTypes = types;

export default creators;
