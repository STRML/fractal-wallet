import appActions, { appTypes } from "@redux/app";
import DataEntry from "./DataEntry";

export const addDataEntry = ({ payload: { key, value, type } }) => {
  return async (dispatch, getState) => {
    const { app: { data } } = getState();

    // create entry instance
    const entry = new DataEntry(key, value, type);

    // append entry
    data.push(entry);

    // store new data
    await data.store();

    // update redux store
    dispatch(appActions.setData(data));
  };
};

export const removeDataEntry = ({ payload: id }) => {
  return async (dispatch, getState) => {
    const { app: { data } } = getState();

    // remove entry
    data.removeById(id);

    // store new data
    await data.store();

    // update redux store
    dispatch(appActions.setData(data));
  };
};

const Aliases = {
  [appTypes.ADD_DATA_ENTRY]: addDataEntry,
  [appTypes.REMOVE_DATA_ENTRY]: removeDataEntry,
};

export default Aliases;
