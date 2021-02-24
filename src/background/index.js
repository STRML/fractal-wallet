import { alias, wrapStore } from "webext-redux";

import createStore from "@redux";
import appActions from "@redux/app";
import kiltActions from "@redux/kilt";
import { getData } from "@redux/selectors";

import aliases from "@background/aliases";

import ContentScriptConnection from "@sdk/Connection/ContentScriptConnection";

const contentScript = new ContentScriptConnection();
const store = createStore(alias(aliases));

wrapStore(store);

store.dispatch(appActions.startup());

contentScript.on("hasFields", (fields) => {
  const data = getData(store.getState());

  return data.hasFields(fields);
});

contentScript.on("getFields", (fields) => {
  const data = getData(store.getState());

  return data.getFields(fields);
});

contentScript.on("broadcastCredential", (credential) => {
  store.dispatch(kiltActions.addCredential(credential));
});
