import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import requestsActions from "@redux/requests";
import {
  getAcceptedRequests,
  getPendingRequests,
  getDeclinedRequests,
} from "@redux/selectors";

import "@popup/styles.css";

function truncate(str, length = 10) {
  if (str.length > length) {
    return str.substr(0, length) + "...";
  }

  return str;
}

function renderProperties(properties) {
  const values = Object.values(properties);

  return values.map((value) => <p key={value}>{value}</p>);
}

function renderAcceptedRequests(requests) {
  return (
    <>
      <p>Accepted</p>
      <table>
        <thead>
          <tr>
            <th>Attester</th>
            <th>Properties</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((elem) => (
            <tr key={elem.id}>
              <td>{truncate(elem.attester)}</td>
              <td>{renderProperties(elem.properties)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function renderDeclinedRequests(requests) {
  return (
    <>
      <p>Declined</p>
      <table>
        <thead>
          <tr>
            <th>Attester</th>
            <th>Properties</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((elem) => (
            <tr key={elem.id}>
              <td>{truncate(elem.attester)}</td>
              <td>{renderProperties(elem.properties)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function renderPendingRequests(requests, acceptCallback, declineCallback) {
  return (
    <>
      <p>Pending</p>
      <table>
        <thead>
          <tr>
            <th>Attester</th>
            <th>Properties</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {requests.map((elem) => (
            <tr key={elem.id}>
              <td>{truncate(elem.attester)}</td>
              <td>{renderProperties(elem.properties)}</td>
              <td>
                <button onClick={() => acceptCallback(elem.id)}>Accept</button>
                <button onClick={() => declineCallback(elem.id)}>
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function RequestsIndex() {
  const dispatch = useDispatch();

  const pending = useSelector(getPendingRequests);
  const accepted = useSelector(getAcceptedRequests);
  const declined = useSelector(getDeclinedRequests);

  const hasPendingRequets = pending.length > 0;
  const hasAcceptedRequets = accepted.length > 0;
  const hasDeclinedRequets = declined.length > 0;

  const hasRequets =
    hasDeclinedRequets || hasAcceptedRequets || hasPendingRequets;

  const acceptRequest = (id) => dispatch(requestsActions.acceptRequest(id));
  const declineRequet = (id) => dispatch(requestsActions.declineRequest(id));

  return (
    <div className="Popup">
      <Link to="/home">Back</Link>
      <hr />
      <h2>
        <strong>Requests</strong>
      </h2>
      {!hasRequets && <p>No data share requests.</p>}
      {hasRequets && (
        <div>
          {hasPendingRequets &&
            renderPendingRequests(pending, acceptRequest, declineRequet)}
          {hasAcceptedRequets && renderAcceptedRequests(accepted)}
          {hasDeclinedRequets && renderDeclinedRequests(declined)}
        </div>
      )}
    </div>
  );
}

export default RequestsIndex;
