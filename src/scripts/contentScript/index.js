/* global chrome */

import InpageConnection from "@models//Connection/InpageConnection";
import BackgroundConnection from "@models//Connection/BackgroundConnection";

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
  .proxy("broadcastCredential")
  .proxy("getCredential")
  .proxy("getProperties")
  .proxy("getPublicIdentity")
  .proxy("hasCredential")
  .proxy("hasProperties")
  .proxy("requestAttestation");
