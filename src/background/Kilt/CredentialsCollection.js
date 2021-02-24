import BaseCollection from "@background/BaseCollection";

import Credential from "./Credential";

import StorageService from "@services/storage";

export default class CredentialsCollection extends BaseCollection {
  static parse(str) {
    const credentials = JSON.parse(str);

    const elements = credentials.map((element) => Credential.parse(element));

    return new CredentialsCollection(...elements);
  }

  async store() {
    await StorageService.setItem("credentials", this.serialize());
  }

  static async restore() {
    const credentialsString = await StorageService.getItem("credentials", "[]");

    return CredentialsCollection.parse(credentialsString);
  }
}
