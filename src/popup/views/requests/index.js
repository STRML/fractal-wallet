import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RequestTypes from "@models/Request/RequestTypes";

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

function renderShareRequestContent(content) {
  const values = Object.values(content);

  return values.map((value) => <p key={value}>{value}</p>);
}

function renderShareCredentialContent(content) {
  return <p>{truncate(content)}</p>;
}

function renderCredentialRequestContent(content) {
  const keys = Object.keys(content.properties);

  return keys.map((key) => (
    <p key={key}>{`${key} - ${content.properties[key]}`}</p>
  ));
}

function renderContent(content, type) {
  if (type === RequestTypes.SHARE_DATA) {
    return renderShareRequestContent(content);
  }

  if (type === RequestTypes.SHARE_CREDENTIAL) {
    return renderShareCredentialContent(content);
  }

  return renderCredentialRequestContent(content);
}

function renderAcceptedRequests(requests) {
  return (
    <>
      <p>Accepted</p>
      <table>
        <thead>
          <tr>
            <th>Requester</th>
            <th>Content</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((elem) => (
            <tr key={elem.id}>
              <td>{truncate(elem.requester)}</td>
              <td>{renderContent(elem.content, elem.type)}</td>
              <td>{elem.type}</td>
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
            <th>Requester</th>
            <th>Content</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((elem) => (
            <tr key={elem.id}>
              <td>{truncate(elem.requester)}</td>
              <td>{renderContent(elem.content, elem.type)}</td>
              <td>{elem.type}</td>
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
            <th>Requester</th>
            <th>Content</th>
            <th>Type</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {requests.map((elem) => (
            <tr key={elem.id}>
              <td>{truncate(elem.requester)}</td>
              <td>{renderContent(elem.content, elem.type)}</td>
              <td>{elem.type}</td>
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
      {!hasRequets && <p>No data requests.</p>}
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
