import { useDispatch } from "react-redux";

import appActions from "@redux/app";

import "@popup/styles.css";

function Landing() {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(appActions.generateIdentity());

  return (
    <div className="Popup">
      <h2><center>Welcome</center></h2>
      <div>
        <p>
          Press the below button to setup a kilt identity.
        </p>
      </div>
      <button onClick={handleClick}>
        Setup
      </button>
    </div>
  );
}

export default Landing;
