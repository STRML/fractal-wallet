import { alias, wrapStore } from "webext-redux";

import createStore from "@redux";
import aliases from "@background/aliases";
import ContentScriptConnection from "@sdk/Connection/ContentScriptConnection";

const contentScript = new ContentScriptConnection();
const store = createStore(alias(aliases));

wrapStore(store);

// TODO: replace this by a call to the extension;
const FakeUser = { email: "user@example.org", name: "A User" };

contentScript.on("request", (field) => {
  return FakeUser[field];
});
