/* global chrome */

export function injectScript(file) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file);

  document.head.appendChild(script);
}

const sdk = chrome.runtime.getURL("sdk.bundle.js");
injectScript(sdk, "body");
