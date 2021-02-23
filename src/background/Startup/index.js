import appActions, { appTypes } from "@redux/app";
import kiltActions from "@redux/kilt";

import KiltService from "@services/kilt";

import Mnemonic from "@background/Kilt/Mnemonic";
import DataCollection from "@background/Data/DataCollection";

export const startup = () => {
  return async (dispatch) => {
    // connect to the kilt chain
    await KiltService.connect();

    // restore stored mnemonic and data
    const mnemonic = await Mnemonic.restore();
    const data = await DataCollection.restore();

    // register balance listener
    const onChangeBalance = (_account, balance) =>
      dispatch(kiltActions.setBalance(balance.toString()));

    await KiltService.registerBalanceListener(
      mnemonic.identity,
      onChangeBalance
    );

    // update redux store
    dispatch(kiltActions.setMnemonic(mnemonic));
    dispatch(appActions.setData(data));
  };
};

const Aliases = {
  [appTypes.STARTUP]: startup,
};

export default Aliases;
