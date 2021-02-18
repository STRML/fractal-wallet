import appActions, { appTypes } from "@redux/app";

import Mnemonic from '@background/Kilt/Mnemonic';
import DataCollection from '@background/Data/DataCollection';

export const startup = () => {
  return async (dispatch) => {
    // restore stored mnemonic and data
    const mnemonic = await Mnemonic.restore();
    const data = await DataCollection.restore();

    // update redux store
    dispatch(appActions.setMnemonic(mnemonic));
    dispatch(appActions.setData(data));
  };
};

const Aliases = {
  [appTypes.STARTUP]: startup,
};

export default Aliases;
