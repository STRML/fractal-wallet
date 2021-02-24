import StorageService from "@services/storage";
import KiltService from "@services/kilt";

export default class Mnemonic {
  constructor(mnemonic, identity) {
    this.mnemonic = mnemonic;
    this.identity = identity;
  }

  serialize() {
    return this.mnemonic.toString();
  }

  static async parse(str) {
    let identity = null;

    if (str) identity = await KiltService.buildIdentityFromMnemonic(str);

    return new Mnemonic(str, identity);
  }

  async store() {
    await StorageService.setItem("mnemonic", this.mnemonic.toString());
  }

  static async restore() {
    const mnemonic = await StorageService.getItem("mnemonic", "");

    return await Mnemonic.parse(mnemonic);
  }
}
