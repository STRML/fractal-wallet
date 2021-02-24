/* global chrome */

import kiltActions, { kiltTypes } from "@redux/kilt";
import { getCredentials } from "@redux/selectors";

import Credential from "./Credential";
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

export const createCredential = () => {
  return async () => {
    // open attester url
    chrome.tabs.create({ url: process.env.REACT_APP_ATTESTER_URL });
  };
};

export const addCredential = ({
  payload: { id, attester, claimer, content, type, createAt },
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
      createAt,
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
