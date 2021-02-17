import React from "react";
import ReactDOM from "react-dom";
import { Store } from "webext-redux";
import { Provider as ReduxProvider } from "react-redux";

import "./Popup.css";
import Popup from "./Popup";

const store = new Store();

// wait for the store to connect to the background page
store.ready()
.then(() => {
  ReactDOM.render(
    <ReduxProvider store={store}>
      <Popup/>
    </ReduxProvider>
    , document.getElementById("popup"));
});
