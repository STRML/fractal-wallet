/* global chrome */

import LocalMessageDuplexStream from "post-message-stream";

import Invokation from "../sdk/message/invokation";
import Response from "../sdk/message/response";
import { contentScriptParams } from "../sdk/connection";

export function injectScript(file) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file);

  document.head.appendChild(script);
}

const sdk = chrome.runtime.getURL("sdk.bundle.js");
injectScript(sdk, "body");

const stream = new LocalMessageDuplexStream(contentScriptParams);

stream.on("data", (data) => {
  const { method, id } = Invokation.parse(data);

  if (method === "verifyConnection") {
    const { version } = chrome.runtime.getManifest();

    const response = new Response("verifyConnection", version, id);
    stream.write(response.serialize());
  }
});
