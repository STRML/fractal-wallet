import { alias, wrapStore } from "webext-redux";

import createStore from "@redux";
import appActions from "@redux/app";
import kiltActions from "@redux/kilt";
import { getData, getAddress, getIdentity } from "@redux/selectors";
import aliases from "@background/aliases";
import KiltService from "@services/kilt";
import ContentScriptConnection from "@models/Connection/ContentScriptConnection";

function init() {
  const contentScript = new ContentScriptConnection();
  const store = createStore(alias(aliases));

  wrapStore(store);

  store.dispatch(appActions.startup());

  contentScript.on("hasProperties", (properties) => {
    const data = getData(store.getState());

    return data.hasProperties(properties);
  });

  contentScript.on("getProperties", (properties) => {
    const data = getData(store.getState());

    return data.getProperties(properties);
  });

  contentScript.on("broadcastCredential", (credential) => {
    store.dispatch(kiltActions.addCredential(credential));
  });

  contentScript.on("getAddress", () => {
    return getAddress(store.getState());
  });

  contentScript.on("requestAttestation", async (ctype, target) => {
    const identity = getIdentity(store.getState());
    const data = getData(store.getState());
    const propertyNames = Object.keys(ctype.schema.properties);
    const properties = data.getProperties(propertyNames);

    const request = await KiltService.buildAttestationRequest(
      identity,
      ctype,
      properties,
    );

    const response = await KiltService.buildAttestationRequestMessage(
      identity,
      request,
      target,
    );

    return response;
  });
}

init();
