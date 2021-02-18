import appActions, { appTypes } from "@redux/app";

import Mnemonic from "./Mnemonic";

import KiltService from "@services/kilt";

const generateIdentity = () => {
  return async (dispatch) => {
    const { mnemonic } = await KiltService.generateIdentity();

    // create mnemonic class instance
    const instance = new Mnemonic(mnemonic);

    // store new mnemonic
    await instance.store();

    // update redux store
    dispatch(appActions.setMnemonic(instance));
  };
};

const Aliases = {
  [appTypes.GENERATE_IDENTITY]: generateIdentity,
};

export default Aliases;
