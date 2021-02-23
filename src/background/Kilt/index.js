import kiltActions, { kiltTypes } from "@redux/kilt";
import { getIdentity } from "@redux/selectors";

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

const getBalance = () => {
  return async (dispatch, getState) => {
    const identity = getIdentity(getState());

    // get balance
    const balance = KiltService.getBalance(identity);

    // update redux store
    dispatch(kiltActions.setBalance(balance));
  };
};

const Aliases = {
  [kiltTypes.GENERATE_IDENTITY]: generateIdentity,
  [kiltTypes.GET_BALANCE]: getBalance,
};

export default Aliases;
