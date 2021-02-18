/* global chrome */

import ContentScriptConnection from "@sdk/Connection/ContentScriptConnection";

import { injectScript } from "./injector";

// TODO: replace this by a call to the extension;
const FakeUser = { email: "user@example.org", name: "A User" };

const sdk = chrome.runtime.getURL("sdk.bundle.js");
injectScript(sdk);

const stream = new ContentScriptConnection();

stream.on("verifyConnection", () => {
  const { version } = chrome.runtime.getManifest();
  return version;
});

stream.on("request", (field) => {
  return FakeUser[field];
});
