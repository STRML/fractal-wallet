import { v4 as uuidv4 } from "uuid";

export default class Credential {
  constructor(
    id = null,
    attester,
    claimer,
    properties,
    ctype,
    claim,
    createdAt = null,
  ) {
    this.id = id || uuidv4();
    this.attester = attester;
    this.claimer = claimer;
    this.properties = properties;
    this.ctype = ctype;
    this.claim = claim;
    this.createdAt = createdAt || new Date();
  }

  serialize() {
    return JSON.stringify({
      id: this.id,
      attester: this.attester,
      claimer: this.claimer,
      properties: this.properties,
      ctype: this.ctype,
      claim: this.claim,
      date: this.createdAt,
    });
  }

  static parse(str) {
    const {
      id,
      attester,
      claimer,
      properties,
      ctype,
      claim,
      date,
    } = JSON.parse(str);

    return new Credential(
      id,
      attester,
      claimer,
      properties,
      ctype,
      claim,
      date,
    );
  }
}
