import ExtensionConnection from "@models/Connection/ExtensionConnection";

const stream = new ExtensionConnection();

const broadcastCredential = (...args) =>
  stream.invoke("broadcastCredential", ...args);

const getPublicIdentity = () => stream.invoke("getPublicIdentity");

const getProperties = (...args) => stream.invoke("getProperties", ...args);

const hasProperties = (...args) => stream.invoke("hasProperties", ...args);

const requestAttestation = (...args) =>
  stream.invoke("requestAttestation", ...args);

const verifyConnection = () => stream.invoke("verifyConnection");

const Attester = {
  broadcastCredential,
  getPublicIdentity,
  getProperties,
  hasProperties,
  requestAttestation,
  verifyConnection,
};

export default Attester;
