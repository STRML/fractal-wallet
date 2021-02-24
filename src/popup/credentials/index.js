import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import kiltActions from "@src/redux/kilt";
import { getCredentials } from "@redux/selectors";

import "@popup/styles.css";

function truncate(str, length = 10) {
  if (str.length > length) {
    return str.substr(0, length) + "...";
  }

  return str;
}

function renderContent(content) {
  const values = Object.values(content);

  return values.map(({ id, key, value }) => (
    <p key={id}>{`${key} - ${value}`}</p>
  ));
}

function CredentialsHome() {
  const dispatch = useDispatch();

  const credentials = useSelector(getCredentials);

  const createCredential = () => dispatch(kiltActions.createCredential());

  return (
    <div className="Popup">
      <Link to="/home">Back</Link>
      <hr />
      <h2>
        <strong>Credentials</strong>
      </h2>
      {credentials.length === 0 && (
        <p>No data credentials, please create one.</p>
      )}
      {credentials.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Attester</th>
                <th>Claimer</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {credentials.map((elem) => (
                <tr key={elem.id}>
                  <td>{truncate(elem.attester)}</td>
                  <td>{truncate(elem.claimer)}</td>
                  <td>{renderContent(elem.content)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <br />
      <br />

      <button onClick={createCredential}>Create</button>
    </div>
  );
}

export default CredentialsHome;
