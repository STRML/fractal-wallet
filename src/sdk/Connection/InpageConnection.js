import LocalMessageDuplexStream from "post-message-stream";

import Callbacks from "@sdk/Callbacks";
import Invokation from "@sdk/Message/Invokation";
import Response from "@sdk/Message/Response";

import { inpage } from "./params";

export default class InpageConnection {
  constructor() {
    this.stream = new LocalMessageDuplexStream(inpage);

    this._setupEvents();
  }

  _setupEvents() {
    this.stream.on("data", this._handleData.bind(this));
  }

  _handleData(data) {
    const { value, id, success } = Response.parse(data);
    const callback = Callbacks.pop(id);

    if (!callback) return;

    const { resolve, reject } = callback;
    success ? resolve(value) : reject(value);
  }

  invoke(method, args = []) {
    return new Promise((resolve, reject) => {
      const message = new Invokation(method, args);
      this.stream.write(message.serialize());

      Callbacks.push(message, resolve, reject);
    });
  }
}
