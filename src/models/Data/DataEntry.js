import { v4 as uuidv4 } from "uuid";

export default class DataEntry {
  constructor(key, value, validated = false, id = null) {
    this.id = id || uuidv4();
    this.key = key;
    this.value = value;
    this.validated = validated;
  }

  serialize() {
    return JSON.stringify({
      id: this.id,
      key: this.key,
      value: this.value,
      validated: this.validated,
    });
  }

  static parse(str) {
    const { id, key, value, validated } = JSON.parse(str);

    return new DataEntry(key, value, validated, id);
  }
}
