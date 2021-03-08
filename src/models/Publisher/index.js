import ExtensionConnection from "@models/Connection/ExtensionConnection";

const stream = new ExtensionConnection();

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
