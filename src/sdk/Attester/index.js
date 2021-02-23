import ExtensionConnection from "@sdk/Connection/ExtensionConnection";

const stream = new ExtensionConnection();

const verifyConnection = () => stream.invoke("verifyConnection");
const hasFields = (fields) => stream.invoke("hasFields", fields);

const Attester = { verifyConnection, hasFields };

export default Attester;
