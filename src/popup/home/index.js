import React from "react";
import { useSelector } from "react-redux";

import { getMnemonic } from "@redux/selectors";

import "@popup/styles.css";

import Data from "@popup/home/Data";

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
        <Data />
      </div>
    </div>
  );
}

export default Home;
