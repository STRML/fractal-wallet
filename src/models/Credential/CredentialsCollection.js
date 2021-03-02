import Collection from "@models/Base/Collection";
import Credential from "@models/Credential/Credential";

import StorageService from "@services/storage";

export default class CredentialsCollection extends Collection {
  getData(key) {
    return this.find(({ content }) => !!content[key]);
  }

  hasData(key) {
    return !!this.getData(key);
  }

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
