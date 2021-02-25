import ExtensionConnection from "@models/Connection/ExtensionConnection";

const stream = new ExtensionConnection();

const broadcastCredential = (credential) =>
  stream.invoke("broadcastCredential", credential);

const getAddress = () => stream.invoke("getAddress");

const getProperties = (properties) =>
  stream.invoke("getProperties", properties);

const hasProperties = (properties) =>
  stream.invoke("hasProperties", properties);

const requestAttestation = (ctype, target) =>
  stream.invoke("requestAttestation", ctype, target);

const verifyConnection = () => stream.invoke("verifyConnection");

const Attester = {
  broadcastCredential,
  getAddress,
  getProperties,
  hasProperties,
  requestAttestation,
  verifyConnection,
};

export default Attester;
