import ExtensionConnection from "@models/Connection/ExtensionConnection";
import { extension_publisher } from "@models/Connection/params";

const stream = new ExtensionConnection(extension_publisher);

const requestCredential = (...args) =>
  stream.invoke("requestCredential", ...args);

const getPublicIdentity = () => stream.invoke("getPublicIdentity");

const verifyConnection = () => stream.invoke("verifyConnection");

const Publisher = {
  requestCredential,
  getPublicIdentity,
  verifyConnection,
};

export default Publisher;
