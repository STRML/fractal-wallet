/* global chrome */

import kiltActions, { kiltTypes } from "@redux/kilt";
import { getCredentials } from "@redux/selectors";

import Mnemonic from "@src/models/Mnemonic";
import Credential from "@src/models/Credential/Credential";

import KiltService from "@services/kilt";

const generateIdentity = () => {
  return async (dispatch) => {
    const { mnemonic, identity } = await KiltService.generateIdentity();

    // create mnemonic class instance
    const instance = new Mnemonic(mnemonic, identity);

    // store new mnemonic
    await instance.store();

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
  payload: { id, attester, claimer, content, type, createdAt },
}) => {
  return async (dispatch, getState) => {
    const credentials = getCredentials(getState());

    // create credential instance
    const credential = new Credential(
      id,
      attester,
      claimer,
      content,
      type,
      createdAt,
    );

    // append credential
    credentials.push(credential);

    // store new credentials
    await credentials.store();

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
