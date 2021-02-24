import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import Loading from "@popup/loading";

import { isSignedIn, isLaunched } from "@redux/selectors";

function HomeRoutes({ children, ...rest }) {
  const signIn = useSelector(isSignedIn);
  const launched = useSelector(isLaunched);

  if (!launched) {
    return <Loading />;
  }

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
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default HomeRoutes;
