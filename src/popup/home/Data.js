import appActions from "@redux/app";
import { getData } from "@redux/selectors";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataTypes from '@background/Data/DataTypes';

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

function Data() {
  const dispatch = useDispatch();

  const data = useSelector(getData);

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState(DataTypes.STRING);

  const addEntry = (event) => {
    if (key && value && type) {
      dispatch(appActions.addDataEntry({ key, value, type }));

      setKey("");
      setValue("");
      setType(DataTypes.STRING);
    }
    event.preventDefault();
  }

  const removeEntry = (id) => dispatch(appActions.removeDataEntry(id));

  return (
    <div>
      <div>
        <h3><strong>Data</strong></h3>
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
              <tr key={elem.id}>
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

      <div>
        <form onSubmit={addEntry}>
          <p><strong>New entry</strong></p>
          <input
            name="key"
            placeholder="key"
            type="text"
            value={key}
            onChange={event => setKey(event.target.value)}
          /><br />
          <input
            name="value"
            placeholder="value"
            type="text"
            value={value}
            onChange={event => setValue(event.target.value)}
          /><br />
          <select
            name="type"
            value={type}
            onChange={event => setType(event.target.value)}
          >
            {Object.values(DataTypes).map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <br />
          <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
}

export default Data;
