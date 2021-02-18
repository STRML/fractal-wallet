import { v4 as uuidv4 } from "uuid";
import DataTypes from "./DataTypes";

export default class DataEntry {
  constructor(key, value, type, validated = false, id = null) {
    this.id = id || uuidv4();
    this.key = key;
    this.value = DataEntry.formatValue(value, type);
    this.type = type;
    this.validated = validated;
  }

  static formatValue(value, type) {
    if (type === DataTypes.NUMBER) {
      return Number(value);
    }

    if (type === DataTypes.OBJECT) {
      return JSON.parse(value);
    }

    return value;
  }

  serialize() {
    return JSON.stringify({
      id: this.id,
      key: this.key,
      value: this.value,
      type: this.type,
      validated: this.validated,
    });
  }

  static parse(str) {
    const { id, key, value, type, validated } = JSON.parse(str);

    return new DataEntry(key, value, type, validated, id);
  }
}
