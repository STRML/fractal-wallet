/* global chrome */

import Response from "@models/Message/Response";

export default class ContentScriptConnection {
  constructor() {
    this.callbacks = {};

    this._setupEvents();
  }

  _setupEvents() {
    chrome.runtime.onConnect.addListener((port) => {
      this.port = port;
      this.port.onMessage.addListener(this._handleMessage.bind(this));
    });
  }

  _handleMessage(msg) {
    const { method, args, id } = msg;
    const callback = this.callbacks[method];

    if (!callback) throw new Error(`Unexpected method ${method}`);

    const value = callback(...args);

    const response = new Response(method, value, id);
    this.port.postMessage(response.serialize());
  }

  on(method, callback) {
    this.callbacks[method] = callback;
    return this;
  }
}
