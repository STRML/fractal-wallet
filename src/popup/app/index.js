import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeRoutes from "@popup/middleware/HomeRoutes";

import CredentialsIndex from "@popup/views/credentials";

import DataIndex from "@popup/views/data";
import DataCreate from "@popup/views/data/create";

import RequestsIndex from "@popup/views/requests";

import Home from "@popup/views/home";
import Landing from "@popup/views/landing";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/landing">
          <Landing />
        </Route>
        <HomeRoutes>
          <Route path="/data">
            <Switch>
              <Route path="/data/create">
                <DataCreate />
              </Route>
              <Route path="/">
                <DataIndex />
              </Route>
            </Switch>
          </Route>
          <Route path="/credentials">
            <Route path="/">
              <CredentialsIndex />
            </Route>
          </Route>
          <Route path="/requests">
            <Route path="/">
              <RequestsIndex />
            </Route>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </HomeRoutes>
      </Switch>
    </Router>
  );
}

export default App;
