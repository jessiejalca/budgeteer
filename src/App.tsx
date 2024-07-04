import "./App.css";
import Calculator from "./components/Calculator";

function App() {

  return (
    <>
      <hgroup>
        <h1>Budgeteer.</h1>
        <p className="subhead">Let's calculate stuff.</p>
      </hgroup>

      <Calculator />
    </>
  );
}

export default App;
