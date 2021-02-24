import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeRoutes from "@popup/middleware/HomeRoutes";

import CredentialsIndex from "@popup/credentials";

import DataIndex from "@popup/data";
import DataCreate from "@popup/data/create";

import Home from "@popup/home";
import Landing from "@popup/landing";

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
          <Route path="/">
            <Home />
          </Route>
        </HomeRoutes>
      </Switch>
    </Router>
  );
}

export default App;
