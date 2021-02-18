import InpageConnection from "@sdk/Connection/InpageConnection";

const stream = new InpageConnection();

const verifyConnection = () => stream.invoke("verifyConnection");
const request = (field) => stream.invoke("request", [field]);

const Attester = { verifyConnection, request };

export default Attester;
