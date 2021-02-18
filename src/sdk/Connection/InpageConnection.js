import LocalMessageDuplexStream from "post-message-stream";

import MethodCallbacks from "@sdk/Callbacks/MethodCallbacks";
import Invokation from "@sdk/Message/Invokation";
import Response from "@sdk/Message/Response";
import BackgroundConnection from "@sdk/Connection/BackgroundConnection";

import { inpage } from "./params";

export default class InpageConnection {
  constructor() {
    this.stream = new LocalMessageDuplexStream(inpage);
    this.background = new BackgroundConnection();
    this.methodCallbacks = new MethodCallbacks();
    this.proxy = new Set();
    this.proxiedCallbacks = new MethodCallbacks(); // TODO: this needs a new class

    this._setupEvents();
  }

  _setupEvents() {
    this.background.listen(this._handleMessage.bind(this));
    this.stream.on("data", this._handleData.bind(this));
  }

  _isDeferred(method) {
    return this.deferredMethods.isDeferred(method);
  }

  _call(invokation) {
    const { method, args, id } = invokation;

    const value = this.methodCallbacks.call(method, args);

    const response = new Response(method, value, id);
    this.stream.write(response.serialize());
  }

  _proxy(invokation) {
    this.background.invoke(invokation);
    this.proxiedCallbacks.push(invokation);
  }

  // handles data from the inpage script
  _handleData(data) {
    const invokation = Invokation.parse(data);
    const { method } = invokation;

    this._isDeferred(method) ? this._proxy(invokation) : this._call(invokation);
  }

  // handles messages from the background script
  _handleMessage(response) {
    this.stream.write(response.serialize());
  }

  on(method, callback) {
    this.methodCallbacks.push(method, callback);
    return this;
  }

  proxy(method) {
    this.proxy.add(method);
  }
}
