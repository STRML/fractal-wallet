import { appTypes } from "@redux/app";
import kiltActions from "@redux/kilt";
import dataActions from "@redux/data";
import appActions from "@redux/app";
import requestsActions from "@redux/requests";

import KiltService from "@services/kilt";

import Mnemonic from "@models/Mnemonic";
import DataCollection from "@models/Data/DataCollection";
import CredentialsCollection from "@models/Credential/CredentialsCollection";
import RequestsCollection from "@models/Request/RequestsCollection";

export const startup = () => {
  return async (dispatch) => {
    // connect to the kilt chain
    await KiltService.connect();

    // restore stored mnemonic, data, credentials and requests
    const mnemonic = await Mnemonic.restore();
    const data = await DataCollection.restore();
    const credentials = await CredentialsCollection.restore();
    const requests = await RequestsCollection.restore();

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
    dispatch(kiltActions.setCredentials(credentials));
    dispatch(dataActions.setData(data));
    dispatch(requestsActions.setRequests(requests));

    // set extension as launched
    dispatch(appActions.setLaunched(true));
  };
};

const Aliases = {
  [appTypes.STARTUP]: startup,
};

export default Aliases;
