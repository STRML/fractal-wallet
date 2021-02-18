import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getMnemonic } from "@redux/selectors";

import "@popup/styles.css";

function Home() {
  const mnemonic = useSelector(getMnemonic);

  return (
    <div className="Popup">
      <h2><center>Home</center></h2>
      <div>
        <div>
          <p><strong>Mnemonic</strong></p>
          <p>{mnemonic}</p>
        </div>
        <br /><br />
        <Link to="/data">Data</Link>
      </div>
    </div>
  );
}

export default Home;
