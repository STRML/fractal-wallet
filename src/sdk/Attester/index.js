import ExtensionConnection from "@sdk/Connection/ExtensionConnection";

const stream = new ExtensionConnection();

const verifyConnection = () => stream.invoke("verifyConnection");
const hasFields = (fields) => stream.invoke("hasFields", fields);
const getFields = (fields) => stream.invoke("getFields", fields);
const broadcastCredential = (credential) =>
  stream.invoke("broadcastCredential", credential);

const Attester = {
  verifyConnection,
  hasFields,
  getFields,
  broadcastCredential,
};

export default Attester;
