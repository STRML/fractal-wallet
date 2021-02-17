import { useDispatch } from "react-redux";

import appActions from "../redux/app";

import logo from "../assets/logo.svg";
import "./Popup.css";

function Popup() {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(appActions.generateIdentity());

  return (
    <div className="Popup">
      <header className="Popup-header">
        <img src={logo} className="Popup-logo" alt="logo" />
        <h3>Welcome!</h3>
        <p>
          Press the below button to setup a kilt identity.
        </p>
        <button onClick={handleClick}>
          Setup
        </button>
      </header>
    </div>
  );
}

export default Popup;
