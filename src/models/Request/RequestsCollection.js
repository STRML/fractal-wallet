import Collection from "@models/Base/Collection";

import Request from "@models/Request/";
import RequestStatus from "@models/Request/RequestStatus";

import StorageService from "@services/storage";

export default class RequestsCollection extends Collection {
  filterByStatus(status) {
    return this.filter(({ status: itemStatus }) => itemStatus === status);
  }

  getPending() {
    return this.filterByStatus(RequestStatus.PENDING);
  }

  getAccepted() {
    return this.filterByStatus(RequestStatus.ACCEPTED);
  }

  getDeclined() {
    return this.filterByStatus(RequestStatus.DECLINED);
  }

  static parse(str) {
    const data = JSON.parse(str);

    const elements = data.map((element) => Request.parse(element));

    return new RequestsCollection(...elements);
  }
}
