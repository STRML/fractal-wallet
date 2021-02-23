import { alias, wrapStore } from "webext-redux";

import createStore from "@redux";
import appActions from "@redux/app";
import aliases from "@background/aliases";
import ContentScriptConnection from "@sdk/Connection/ContentScriptConnection";

const contentScript = new ContentScriptConnection();
const store = createStore(alias(aliases));

wrapStore(store);

store.dispatch(appActions.startup());

contentScript.on("hasFields", (fields) => {
  const {
    data: { data },
  } = store.getState();

  return data.hasFields(fields);
});
