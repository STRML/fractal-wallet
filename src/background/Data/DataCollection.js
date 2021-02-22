import DataEntry from "./DataEntry";

import StorageService from "@services/storage";

export default class DataCollection extends Array {
  serialize() {
    return JSON.stringify(this.map((element) => element.serialize()));
  }

  removeById(id) {
    const index = this.findIndex((element) => element.id === id);

    if (index >= 0) {
      this.splice(index, 1);
    }
  }

  getUnvalidated() {
    return this.filter((elem) => !elem.validated);
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
