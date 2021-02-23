import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import dataActions from "@redux/data";
import { getData } from "@redux/selectors";

import "@popup/styles.css";

function DataHome() {
  const dispatch = useDispatch();

  const data = useSelector(getData);

  const removeEntry = (id) => dispatch(dataActions.removeDataEntry(id));

  return (
    <div className="Popup">
      <Link to="/home">Back</Link>
      <hr />
      <h2>
        <strong>Data</strong>
      </h2>
      {data.length === 0 && <p>No data entries, please create one.</p>}
      {data.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map((elem) => (
                <tr key={elem.key}>
                  <td>{elem.key}</td>
                  <td>{elem.value}</td>
                  <td>{elem.validated ? "✓" : "?"}</td>
                  <td>
                    <button onClick={() => removeEntry(elem.id)}>✗</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/data/create">Create</Link>
    </div>
  );
}

export default DataHome;
