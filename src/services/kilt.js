import Kilt, { Identity, Balance } from "@kiltprotocol/sdk-js";

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
}

const kilt = KiltProtocol.getInstance();

export default kilt;
