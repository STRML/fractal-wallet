import { v4 as uuidv4 } from "uuid";

import RequestStatus from "./RequestStatus";

export default class Request {
  constructor(
    id = null,
    attester,
    properties,
    status = RequestStatus.PENDING,
    createdAt = null,
  ) {
    this.id = id || uuidv4();
    this.attester = attester;
    this.properties = properties;
    this.status = status;
    this.createdAt = createdAt || new Date();
  }

  serialize() {
    return JSON.stringify({
      id: this.id,
      attester: this.attester,
      properties: this.properties,
      status: this.status,
      createdAt: this.createdAt,
    });
  }

  static parse(str) {
    const { id, attester, properties, status, createdAt } = JSON.parse(str);

    return new Request(id, attester, properties, status, createdAt);
  }
}
