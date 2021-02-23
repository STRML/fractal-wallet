import kiltActions, { kiltTypes } from "@redux/kilt";

import Mnemonic from "./Mnemonic";

import KiltService from "@services/kilt";

const generateIdentity = () => {
  return async (dispatch) => {
    const { mnemonic, identity } = await KiltService.generateIdentity();

    // create mnemonic class instance
    const instance = new Mnemonic(mnemonic, identity);

    // store new mnemonic
    await instance.store();

    // update redux store
    dispatch(kiltActions.setMnemonic(instance));
  };
};

const Aliases = {
  [kiltTypes.GENERATE_IDENTITY]: generateIdentity,
};

export default Aliases;
