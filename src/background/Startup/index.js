import { appTypes } from "@redux/app";
import kiltActions from "@redux/kilt";
import dataActions from "@redux/data";
import appActions from "@redux/app";

import KiltService from "@services/kilt";

import Mnemonic from "@background/Kilt/Mnemonic";
import DataCollection from "@background/Data/DataCollection";
import CredentialsCollection from "@background/Kilt/CredentialsCollection";

export const startup = () => {
  return async (dispatch) => {
    // connect to the kilt chain
    await KiltService.connect();

    // restore stored mnemonic, data and credentials
    const mnemonic = await Mnemonic.restore();
    const data = await DataCollection.restore();
    const credentials = await CredentialsCollection.restore();

    // register balance listener
    if (mnemonic.mnemonic.length > 0) {
      const onChangeBalance = (_account, balance) =>
        dispatch(kiltActions.setBalance(balance.toString()));

      await KiltService.registerBalanceListener(
        mnemonic.identity,
        onChangeBalance,
      );
    }

    // update redux store
    dispatch(kiltActions.setMnemonic(mnemonic));
    dispatch(dataActions.setData(data));
    dispatch(kiltActions.setCredentials(credentials));

    // set extension as launched
    dispatch(appActions.setLaunched(true));
  };
};

const Aliases = {
  [appTypes.STARTUP]: startup,
};

export default Aliases;
