import InpageConnection from "@sdk/Connection/InpageConnection";

const stream = new InpageConnection();

const verifyConnection = () => stream.invoke("verifyConnection");

const Attester = { verifyConnection };

export default Attester;
