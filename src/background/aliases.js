import appActions, { appTypes } from "../redux/app";

import KiltService from "../services/kilt";

const generateIdentity = (action) => {
    return async (dispatch) => {
        const { mnemonic } = await KiltService.generateIdentity();

        dispatch(appActions.setMnemonic(mnemonic));
    };
};

const aliases = {
    [appTypes.GENERATE_IDENTITY]: generateIdentity,
}

export default aliases;
