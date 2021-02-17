import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import appActions from "@redux/app";
import { isSignedIn } from "@redux/selectors";

import Home from "@popup/home";
import Landing from "@popup/landing";

function App() {
  const dispatch = useDispatch();
  const signIn = useSelector(isSignedIn);

  useEffect(function() {
    dispatch(appActions.startup());
  });

  return (
    <>
      { ! signIn && <Landing />}
      { signIn && <Home />}
    </>
  );
}

export default App;
