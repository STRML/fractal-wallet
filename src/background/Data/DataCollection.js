import BaseCollection from "@background/BaseCollection";

import DataEntry from "./DataEntry";

import StorageService from "@services/storage";

export default class DataCollection extends BaseCollection {
  hasField(field) {
    return !!this.find(({ key }) => key === field);
  }

  hasFields(fields) {
    return fields.every(this.hasField.bind(this));
  }

  getField(field) {
    return this.find(({ key }) => key === field);
  }

  getFields(fields) {
    return fields.reduce(
      (memo, elem) => ({ ...memo, [elem]: this.getField(elem) }),
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
