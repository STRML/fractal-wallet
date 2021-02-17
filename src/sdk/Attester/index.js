import LocalMessageDuplexStream from "post-message-stream";

import Invokation from "../message/invokation";
import Response from "../message/response";
import { inpageParams } from "../connection";

const stream = new LocalMessageDuplexStream(inpageParams);

const callbacks = {};

stream.on("data", (data) => {
  const { value, id, success } = Response.parse(data);
  const callback = callbacks[id];

  if (!callbacks[id]) return;

  const { resolve, reject } = callback;
  success ? resolve(value) : reject(value);

  delete callbacks[id];
});

const verifyConnection = () =>
  new Promise((resolve, reject) => {
    const message = new Invokation("verifyConnection");
    stream.write(message.serialize());

    callbacks[message.id] = { message, resolve, reject };
  });

const Attester = { verifyConnection };

export default Attester;
