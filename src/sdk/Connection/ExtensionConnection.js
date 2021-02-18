import LocalMessageDuplexStream from "post-message-stream";

import InvokationCallbacks from "@sdk/InvokationCallbacks";
import Invokation from "@sdk/Message/Invokation";
import Response from "@sdk/Message/Response";

import { extension } from "./params";

export default class ExtensionConnection {
  constructor() {
    this.callbacks = new InvokationCallbacks();
    this.stream = new LocalMessageDuplexStream(extension);

    this._setupEvents();
  }

  _setupEvents() {
    this.stream.on("data", this._handleData.bind(this));
  }

  _handleData(data) {
    const { value, id, success } = Response.parse(data);
    const callback = this.callbacks.pop(id);

    if (!callback) return;

    const { resolve, reject } = callback;
    success ? resolve(value) : reject(value);
  }

  invoke(method, args = []) {
    return new Promise((resolve, reject) => {
      const message = new Invokation(method, args);
      this.stream.write(message.serialize());

      this.callbacks.push(message, resolve, reject);
    });
  }
}
