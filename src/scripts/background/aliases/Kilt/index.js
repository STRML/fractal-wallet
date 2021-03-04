/* global chrome */

import kiltActions, { kiltTypes } from "@redux/kilt";
import { getCredentials } from "@redux/selectors";

import Mnemonic from "@models/Mnemonic";
import Credential from "@models/Credential";

import KiltService from "@services/kilt";

const generateIdentity = () => {
  return async (dispatch) => {
    const { mnemonic, identity } = await KiltService.generateIdentity();

    // create mnemonic class instance
    const instance = new Mnemonic(mnemonic, identity);

    // register balance listener
    const onChangeBalance = (_account, balance) =>
      dispatch(kiltActions.setBalance(balance.toString()));

    await KiltService.registerBalanceListener(
      instance.identity,
      onChangeBalance,
    );

    // update redux store
    dispatch(kiltActions.setMnemonic(instance));
  };
};

export const createCredential = () => {
  return async () => {
    // open attester url
    chrome.tabs.create({ url: process.env.REACT_APP_ATTESTER_URL });
  };
};

export const addCredential = ({
  payload: { id, attester, claimer, properties, ctype, claim, createdAt },
}) => {
  return async (dispatch, getState) => {
    const credentials = getCredentials(getState());

    // create credential instance
    const credential = new Credential(
      id,
      attester,
      claimer,
      properties,
      ctype,
      claim,
      createdAt,
    );

    // append credential
    credentials.push(credential);

    // update redux store
    dispatch(kiltActions.setCredentials(credentials));
  };
};

const Aliases = {
  [kiltTypes.GENERATE_IDENTITY]: generateIdentity,
  [kiltTypes.CREATE_CREDENTIAL]: createCredential,
  [kiltTypes.ADD_CREDENTIAL]: addCredential,
};

export default Aliases;
