import ExtensionConnection from "@sdk/Connection/ExtensionConnection";

const stream = new ExtensionConnection();

const verifyConnection = () => stream.invoke("verifyConnection");
const request = (field) => stream.invoke("request", [field]);

const Attester = { verifyConnection, request };

export default Attester;
