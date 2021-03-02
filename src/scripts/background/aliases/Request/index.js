import requestsActions, { requestsTypes } from "@redux/requests";
import { getPendingRequests, getRequests } from "@redux/selectors";

import Request from "@models/Request";
import RequestStatus from "@models/Request/RequestStatus";

export const addRequest = ({ payload: { id, attester, properties } }) => {
  return async (dispatch, getState) => {
    const requests = getRequests(getState());

    // create request instance
    const request = new Request(id, attester, properties);

    // append request
    requests.push(request);

    // store new requests
    await requests.store();

    // update redux store
    dispatch(requestsActions.setRequests(requests));
  };
};

export const acceptRequest = ({ payload: id }) => {
  return async (dispatch, getState) => {
    const requests = getPendingRequests(getState());

    // get request
    const acceptedRequest = requests.getById(id);
    acceptedRequest.status = RequestStatus.ACCEPTED;

    // update request status
    requests.updateItem(id, acceptedRequest);

    // store new requests
    await requests.store();

    // update redux store
    dispatch(requestsActions.setRequests(requests));
    dispatch(requestsActions.requestAccepted(acceptedRequest));
  };
};

export const removeRequest = ({ payload: id }) => {
  return async (dispatch, getState) => {
    const requests = getRequests(getState());

    // remove requet
    requests.removeById(id);

    // store new requests
    await requests.store();

    // update redux store
    dispatch(requestsActions.setRequests(requests));
  };
};

export const declineRequest = ({ payload: id }) => {
  return async (dispatch, getState) => {
    const requests = getPendingRequests(getState());

    // get request
    const declinedRequest = requests.getById(id);
    declinedRequest.status = RequestStatus.DECLINED;

    // update request status
    requests.updateItem(id, declinedRequest);

    // store new requests
    await requests.store();

    // update redux store
    dispatch(requestsActions.setRequests(requests));

    // update redux store
    dispatch(requestsActions.setRequests(requests));
    dispatch(requestsActions.requestDeclined(declinedRequest));
  };
};

const Aliases = {
  [requestsTypes.ADD_REQUEST]: addRequest,
  [requestsTypes.ACCEPT_REQUEST]: acceptRequest,
  [requestsTypes.REMOVE_REQUEST]: removeRequest,
  [requestsTypes.DECLINE_REQUEST]: declineRequest,
};

export default Aliases;
