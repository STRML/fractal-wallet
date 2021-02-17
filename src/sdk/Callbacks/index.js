const storedCallbacks = {};

export const push = (message, resolve, reject) => {
  const { id } = message;

  storedCallbacks[id] = { message, resolve, reject };
};

export const pop = (id) => {
  const callback = storedCallbacks[id];

  if (!callback) return null;

  delete storedCallbacks[id];

  return callback;
};

const Callbacks = { push, pop };

export default Callbacks;
