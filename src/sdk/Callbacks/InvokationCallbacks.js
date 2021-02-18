// TODO: Find a better name
export default class InvokationCallbacks {
  constructor() {
    this.callbacks = {};
  }

  push(message, resolve, reject) {
    const { id } = message;

    this.callbacks[id] = { message, resolve, reject };
  }

  pop(id) {
    const callback = this.callbacks[id];

    if (!callback) return null;

    delete this.callbacks[id];

    return callback;
  }
}
