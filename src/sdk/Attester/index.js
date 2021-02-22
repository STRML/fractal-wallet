import ExtensionConnection from "@sdk/Connection/ExtensionConnection";

const stream = new ExtensionConnection();

const verifyConnection = () => stream.invoke("verifyConnection");
const unverifiedData = () => stream.invoke("unverifiedData");

const Attester = { verifyConnection, unverifiedData };

export default Attester;
