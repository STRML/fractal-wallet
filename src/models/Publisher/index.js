import ExtensionConnection from "@models/Connection/ExtensionConnection";
import { extension_publisher } from "@models/Connection/params";

const stream = new ExtensionConnection(extension_publisher);

const getCredential = (...args) => stream.invoke("getCredential", ...args);

const hasCredential = (...args) => stream.invoke("hasCredential", ...args);

const getPublicIdentity = () => stream.invoke("getPublicIdentity");

const verifyConnection = () => stream.invoke("verifyConnection");

const Publisher = {
  getCredential,
  hasCredential,
  getPublicIdentity,
  verifyConnection,
};

export default Publisher;
