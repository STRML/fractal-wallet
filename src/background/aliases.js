import appActions, { appTypes } from "@redux/app";

import KiltService from "@services/kilt";
import StorageService from "@services/storage";

const startup = (action) => {
    return async (dispatch) => {
        // check if it has a mnemonic stored
        const mnemonic = await StorageService.getItem("mnemonic");

        if (mnemonic) {
            dispatch(appActions.setMnemonic(mnemonic));
        }
    };
};

const generateIdentity = (action) => {
    return async (dispatch) => {
        const { mnemonic } = await KiltService.generateIdentity();

        // save mnemonic on store
        await StorageService.setItem("mnemonic", mnemonic);

        dispatch(appActions.setMnemonic(mnemonic));
    };
};

const aliases = {
    [appTypes.STARTUP]: startup,
    [appTypes.GENERATE_IDENTITY]: generateIdentity,
}

export default aliases;
