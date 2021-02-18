import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import appActions from "@redux/app";
import { getData } from "@redux/selectors";

import DataTypes from '@background/Data/DataTypes';

import "@popup/styles.css";

function renderValue(value, type) {
  if (type === DataTypes.NUMBER) {
    return (
      <p>{Number(value)}</p>
    )
  }

  if (type === DataTypes.OBJECT) {
    return (
      <p>{JSON.stringify(value, null, 2)}</p>
    )
  }

  return (
    <p>{value}</p>
  )
}

function DataHome() {
  const dispatch = useDispatch();

  const data = useSelector(getData);

  const removeEntry = (id) => dispatch(appActions.removeDataEntry(id));

  return (
    <div className="Popup">
      <Link to="/home">Back</Link>
      <hr />
      <h2><strong>Data</strong></h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Type</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map(elem => (
              <tr key={elem.key}>
                <td>{elem.key}</td>
                <td>{renderValue(elem.value, elem.type)}</td>
                <td>{elem.type}</td>
                <td>{elem.validated ? "✓" : "?"}</td>
                <td><button onClick={() => removeEntry(elem.id)}>✗</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/data/create">Create</Link>
    </div>
  );
}

export default DataHome;
