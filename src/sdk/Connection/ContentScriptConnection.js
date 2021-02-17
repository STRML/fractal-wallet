import LocalMessageDuplexStream from "post-message-stream";

import Invokation from "@sdk/Message/Invokation";
import Response from "@sdk/Message/Response";

import { contentScript } from "./params";

export default class ContentScriptConnection {
  constructor() {
    this.stream = new LocalMessageDuplexStream(contentScript);
    this.callbacks = {};

    this._setupEvents();
  }

  _setupEvents() {
    this.stream.on("data", this._handleData.bind(this));
  }

  _getCallback(method) {
    const callback = this.callbacks[method];

    if (!callback) throw new Error(`Undefined method ${method}`);

    return callback;
  }

  _handleData(data) {
    const { method, args, id } = Invokation.parse(data);

    const callback = this._getCallback(method);
    const value = callback(...args);

    const response = new Response(method, value, id);

    this.stream.write(response.serialize());
  }

  on(method, callback) {
    this.callbacks[method] = callback;
  }
}
