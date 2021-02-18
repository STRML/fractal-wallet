/* global chrome */

import { background } from "./params";

export default class BackgroundConnection {
  constructor() {
    this.port = chrome.runtime.connect(background);
  }

  invoke(invokation) {
    this.port.postMessage(invokation);
  }

  listen(callback) {
    this.port.onMessage.addListener(callback);
  }
}
