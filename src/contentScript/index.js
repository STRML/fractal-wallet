/* global chrome */

import InpageConnection from "@sdk/Connection/InpageConnection";

import { injectScript } from "./injector";

// TODO: replace this by a call to the extension;
const FakeUser = { email: "user@example.org", name: "A User" };

const sdk = chrome.runtime.getURL("sdk.bundle.js");
injectScript(sdk);

const inpage = new InpageConnection();

inpage.on("verifyConnection", () => {
  const { version } = chrome.runtime.getManifest();
  return version;
});

inpage.proxy("request");
