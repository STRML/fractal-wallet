import React from "react";
import { useSelector } from "react-redux";
import {
  Redirect,
  Route,
} from "react-router-dom";

import { isSignedIn } from "@redux/selectors";

function HomeRoutes({ children, ...rest }) {
  const signIn = useSelector(isSignedIn);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        signIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/landing",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default HomeRoutes;
