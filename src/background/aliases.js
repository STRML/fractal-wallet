import { v4 as uuidv4 } from "uuid";

import appActions, { appTypes } from "@redux/app";

import KiltService from "@services/kilt";
import StorageService from "@services/storage";

const startup = () => {
  return async (dispatch) => {
    // check if it has a mnemonic stored
    const mnemonic = await StorageService.getItem("mnemonic");

    if (mnemonic) {
      dispatch(appActions.setMnemonic(mnemonic));
    }

    // check if it has a data stored
    const data = await StorageService.getItem("data");

    if (data) {
      dispatch(appActions.setData(data));
    }
  };
};

const generateIdentity = () => {
  return async (dispatch) => {
    const { mnemonic } = await KiltService.generateIdentity();

    // save mnemonic on store
    await StorageService.setItem("mnemonic", mnemonic);

    dispatch(appActions.setMnemonic(mnemonic));
  };
};

const addDataEntry = ({ payload: entry }) => {
  return async (dispatch, getState) => {
    const { app: { data } } = getState();

    // format entry
    const formattedEntry = entry;

    formattedEntry.id = uuidv4();

    if (entry.type === 'number') {
      formattedEntry.value = Number(entry.value);
    }

    if (entry.type === 'object') {
      formattedEntry.value = JSON.parse(entry.value);
    }

    // append entry
    data.push(formattedEntry);

    // save new data on store
    await StorageService.setItem("data", data);

    dispatch(appActions.setData(data));
  };
};

const removeDataEntry = ({ payload: id }) => {
  return async (dispatch, getState) => {
    const { app: { data } } = getState();

    // remove entry
    const newData = data.filter(elem => elem.id !== id);

    // save new data on store
    await StorageService.setItem("data", newData);

    dispatch(appActions.setData(newData));
  };
};

const aliases = {
  [appTypes.STARTUP]: startup,
  [appTypes.GENERATE_IDENTITY]: generateIdentity,
  [appTypes.ADD_DATA_ENTRY]: addDataEntry,
  [appTypes.REMOVE_DATA_ENTRY]: removeDataEntry,
}

export default aliases;
