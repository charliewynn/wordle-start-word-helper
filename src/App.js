import logo from "./logo.svg";
import StartWordHelper from "./StartWordHelper";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Wordle Start Word Helper</p>
      </header>
      <StartWordHelper />
    </div>
  );
}

export default App;
