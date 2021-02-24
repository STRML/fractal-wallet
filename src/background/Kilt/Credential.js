import { v4 as uuidv4 } from "uuid";

export default class Credential {
  constructor(id = null, attester, claimer, content, type, createAt = null) {
    this.id = id || uuidv4();

    this.attester = attester;
    this.claimer = claimer;
    this.content = content;
    this.type = type;

    this.createdAt = createAt || new Date();
  }

  serialize() {
    return JSON.stringify({
      id: this.id,
      attester: this.attester,
      claimer: this.claimer,
      content: this.content,
      type: this.type,
      date: this.createAt,
    });
  }

  static parse(str) {
    const { id, attester, claimer, content, type, date } = JSON.parse(str);

    return new Credential(id, attester, claimer, content, type, date);
  }
}
