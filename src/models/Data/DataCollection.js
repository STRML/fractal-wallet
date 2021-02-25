import Collection from "@models/Base/Collection";
import DataEntry from "@models/Data/DataEntry";

import StorageService from "@services/storage";

export default class DataCollection extends Collection {
  hasProperty(property) {
    return !!this.find(({ key }) => key === property);
  }

  hasProperties(properties) {
    return properties.every(this.hasProperty.bind(this));
  }

  getProperty(property) {
    return this.find(({ key }) => key === property);
  }

  getProperties(properties) {
    return properties.reduce(
      (memo, elem) => ({ ...memo, [elem]: this.getProperty(elem).value }),
      {},
    );
  }

  static parse(str) {
    const data = JSON.parse(str);

    const elements = data.map((element) => DataEntry.parse(element));

    return new DataCollection(...elements);
  }

  async store() {
    await StorageService.setItem("data", this.serialize());
  }

  static async restore() {
    const dataString = await StorageService.getItem("data", "[]");

    return DataCollection.parse(dataString);
  }
}
