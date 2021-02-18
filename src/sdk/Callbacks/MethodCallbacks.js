// TODO: Find a better name
export default class MethodCallbacks {
  constructor() {
    this.callbacks = {};
  }

  push(method, callback) {
    this.callbacks[method] = callback;
  }

  call(method, args) {
    const callback = this.callbacks[method];

    if (!callback) throw new Error(`Undefined method ${method}`);

    return callback(...args);
  }
}
