import StorageService from "@services/storage";

export default class Mnemonic extends String {
  serialize() {
    return this.toString();
  }

  static parse(str) {
    return new Mnemonic(str);
  }

  async store() {
    await StorageService.setItem("mnemonic", this.toString());
  }

  static async restore() {
    const mnemonic = await StorageService.getItem("mnemonic", "");

    return new Mnemonic(mnemonic);
  }
}
