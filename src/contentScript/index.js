/* global chrome */

import ContentScriptConnection from "@sdk/Connection/ContentScriptConnection";

import { injectScript } from "./injector";

const sdk = chrome.runtime.getURL("sdk.bundle.js");
injectScript(sdk);

const stream = new ContentScriptConnection();

stream.on("verifyConnection", () => {
  const { version } = chrome.runtime.getManifest();
  return version;
});
