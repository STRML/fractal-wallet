import Kilt, {
  Identity,
  Balance,
  MessageBodyType,
  RequestForAttestation,
} from "@kiltprotocol/sdk-js";

import UnsafeCType from "@models/Kilt/UnsafeCType.ts";
import UnsafeClaim from "@models/Kilt/UnsafeClaim.ts";

class KiltProtocol {
  constructor() {
    this.host = undefined;
    this.instance = undefined;

    this.connected = false;
    this.listening = false;
  }

  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new KiltProtocol();
    }

    return this.instance;
  }

  async connect(host = process.env.REACT_APP_BLOCKCHAIN_HOST) {
    this.host = host;
    if (this.connected) {
      await this.disconnect();
    }

    await Kilt.connect(this.host);
    this.connected = true;
  }

  async disconnect() {
    if (this.connected) {
      await Kilt.disconnect(this.host);
      this.connected = false;
    }
  }

  async generateIdentity() {
    const mnemonic = Identity.generateMnemonic();
    const identity = await this.buildIdentityFromMnemonic(mnemonic);

    return {
      mnemonic,
      identity,
    };
  }

  async buildIdentityFromMnemonic(mnemonic) {
    const identity = await Identity.buildFromMnemonic(mnemonic);

    return identity;
  }

  async getBalance(identity) {
    const balance = await Balance.getBalance(identity.address);

    return balance;
  }

  async registerBalanceListener(identity, listener) {
    if (!this.listening) {
      await Balance.listenToBalanceChanges(identity.address, listener);
    }
  }

  async buildAttestationRequest(identity, cTypeObj, properties) {
    const ctype = UnsafeCType.fromCType(cTypeObj);

    const claim = UnsafeClaim.fromCTypeAndClaimContents(
      ctype,
      properties,
      identity.address,
    );

    const { message } = await RequestForAttestation.fromClaimAndIdentity(
      claim,
      identity,
    );

    return message;
  }

  async buildAttestationRequestMessage(identity, request, target) {
    const body = {
      content: { requestForAttestation: request },
      type: MessageBodyType.REQUEST_ATTESTATION_FOR_CLAIM,
    };

    const message = new Kilt.Message(body, identity, target);

    return message.encrypt();
  }
}

const kilt = KiltProtocol.getInstance();

export default kilt;
