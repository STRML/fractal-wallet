import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import HomeRoutes from "@popup/middleware/HomeRoutes";

import appActions from "@redux/app";

import DataIndex from "@popup/data";
import DataCreate from "@popup/data/create";
import Home from "@popup/home";
import Landing from "@popup/landing";

function App(props) {
  const { isReady } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.startup());
  }, [isReady, dispatch]);

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
          <Route path="/">
            <Home />
          </Route>
        </HomeRoutes>
      </Switch>
    </Router>
  );
}

export default App;
