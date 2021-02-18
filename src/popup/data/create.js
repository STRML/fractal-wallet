import { useHistory } from "react-router-dom";
import appActions from "@redux/app";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import DataTypes from '@background/Data/DataTypes';

import "@popup/styles.css";

function DataCreate() {
  let history = useHistory();

  const dispatch = useDispatch();

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState(DataTypes.STRING);

  const addEntry = (event) => {
    event.preventDefault();
    if (key && value && type) {
      dispatch(appActions.addDataEntry({ key, value, type }));

      setKey("");
      setValue("");
      setType(DataTypes.STRING);
    }

    // Navigate back
    history.push("data");
  }

  return (
    <div className="Popup">
      <Link to="/data">Back</Link>
      <hr />
      <h2><strong>Create new data entry</strong></h2>
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
  );
}

export default DataCreate;
