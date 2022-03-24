import "./App.css";
import { Hello } from "./component-lib";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Toshi Nest</h1>
        <p>Toshi Nest is a GNS Science component library</p>
        <p>
          you will be able to find all the documentation for the components
          here.
        </p>
        <Hello></Hello>
      </header>
    </div>
  );
}

export default App;
