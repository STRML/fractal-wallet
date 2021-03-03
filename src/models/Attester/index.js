import ExtensionConnection from "@models/Connection/ExtensionConnection";

const stream = new ExtensionConnection();

const broadcastCredential = (credential) =>
  stream.invoke("broadcastCredential", credential);

const getPublicIdentity = () => stream.invoke("getPublicIdentity");

const getProperties = (request) => stream.invoke("getProperties", request);

const hasProperties = (properties) =>
  stream.invoke("hasProperties", properties);

const requestAttestation = (ctype, target) =>
  stream.invoke("requestAttestation", ctype, target);

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
