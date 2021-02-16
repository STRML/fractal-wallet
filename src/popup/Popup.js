import logo from '../assets/logo.svg';
import './Popup.css';

function Popup() {
  return (
    <div className="Popup">
      <header className="Popup-header">
        <img src={logo} className="Popup-logo" alt="logo" />
        <p>
          Edit <code>src/Popup.js</code> and save to reload.
        </p>
        <a
          className="Popup-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Popup;
