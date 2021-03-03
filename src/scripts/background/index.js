import redux from "@redux";
import appActions from "@redux/app";
import kiltActions from "@redux/kilt";
import { getData, getPublicIdentity, getIdentity } from "@redux/selectors";
import requestsActions, { requestsTypes } from "@redux/requests";
import { watcher } from "@redux/middleware/watcher";

import KiltService from "@services/kilt";

import ContentScriptConnection from "@models/Connection/ContentScriptConnection";
import RequestStatus from "@models/Request/RequestStatus";

const REQUESTS_TIME_OUT = 30 * 1000;

async function init() {
  const contentScript = new ContentScriptConnection();
  const store = await redux.init();

  store.dispatch(appActions.startup());

  contentScript.on("hasProperties", (properties) => {
    const data = getData(store.getState());

    return data.hasProperties(properties);
  });

  contentScript.on("getProperties", (request) => {
    return new Promise((resolve, reject) => {
      const data = getData(store.getState());

      store.dispatch(requestsActions.addRequest(request));

      // assign timeout to the request
      let acceptedListener, declinedListener;
      const requestTimeout = setTimeout(() => {
        store.dispatch(requestsActions.removeRequest(request.id));

        // unsubscribe redux watchers and reject
        acceptedListener.unsubscribe();
        declinedListener.unsubscribe();

        reject(RequestStatus.TIMED_OUT);
      }, REQUESTS_TIME_OUT);

      acceptedListener = watcher.subscribe(
        requestsTypes.REQUEST_ACCEPTED,
        (acceptedRequest) => {
          if (acceptedRequest.id === request.id) {
            // unsubscribe redux watchers and clear timeout
            acceptedListener.unsubscribe();
            acceptedListener.unsubscribe();
            clearTimeout(requestTimeout);

            resolve(data.getProperties(request.properties));
          }
        },
      );

      declinedListener = watcher.subscribe(
        requestsTypes.REQUEST_DECLINED,
        (declinedRequest) => {
          if (declinedRequest.id === request.id) {
            // unsubscribe redux watchers and clear timeout
            acceptedListener.unsubscribe();
            declinedListener.unsubscribe();
            clearTimeout(requestTimeout);

            reject(RequestStatus.DECLINED);
          }
        },
      );
    });
  });

  contentScript.on("broadcastCredential", (credential) => {
    store.dispatch(kiltActions.addCredential(credential));
  });

  contentScript.on("getPublicIdentity", () => {
    return getPublicIdentity(store.getState());
  });

  contentScript.on("requestAttestation", async (ctype, target) => {
    const identity = getIdentity(store.getState());
    const data = getData(store.getState());
    const propertyNames = Object.keys(ctype.schema.properties);
    const properties = data.getProperties(propertyNames);

    const request = await KiltService.buildAttestationRequest(
      identity,
      ctype,
      properties,
    );

    const response = await KiltService.buildAttestationRequestMessage(
      identity,
      request,
      target,
    );

    return response;
  });
}

init();
