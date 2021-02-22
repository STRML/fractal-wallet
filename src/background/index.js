import { alias, wrapStore } from "webext-redux";

import createStore from "@redux";
import appActions from "@redux/app";
import aliases from "@background/aliases";
import ContentScriptConnection from "@sdk/Connection/ContentScriptConnection";

const contentScript = new ContentScriptConnection();
const store = createStore(alias(aliases));

wrapStore(store);

store.dispatch(appActions.startup());

contentScript.on("unverifiedData", () => {
  const {
    app: { data },
  } = store.getState();

  const response = data.getUnvalidated().reduce((memo, { key, value }) => ({...memo, [key]: value}), {});

  return response;
});
