export default class Collection extends Array {
  serialize() {
    return JSON.stringify(this.map((element) => element.serialize()));
  }

  removeById(id) {
    const index = this.findIndex((element) => element.id === id);

    if (index >= 0) {
      this.splice(index, 1);
    }
  }
}
