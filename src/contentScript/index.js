/* global chrome */

import InpageConnection from "@sdk/Connection/InpageConnection";
import BackgroundConnection from "@sdk/Connection/BackgroundConnection";

import { injectScript } from "./injector";

const sdk = chrome.runtime.getURL("sdk.bundle.js");
injectScript(sdk);

const background = new BackgroundConnection();
const inpage = new InpageConnection(background);

inpage
  .on("verifyConnection", () => {
    const { version } = chrome.runtime.getManifest();
    return version;
  })
  .proxy("hasFields")
  .proxy("getFields")
  .proxy("broadcastCredential");
