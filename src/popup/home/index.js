import { useSelector } from "react-redux";

import { getMnemonic } from "@redux/selectors";

import logo from "@assets/logo.svg";
import "@popup/styles.css";

function Home() {
  const mnemonic = useSelector(getMnemonic);

  return (
    <div className="Popup">
      <header className="Popup-header">
        <img src={logo} className="Popup-logo" alt="logo" />
        <h3>Home</h3>
        <h4>{ mnemonic }</h4>
      </header>
    </div>
  );
}

export default Home;
