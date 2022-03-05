import logo from "./logo.svg";
import "./App.css";
import MainPage from "./Components/MainPage/MainPage";
import Predict from "./Components/Predict/Predict";

function App() {
  return (
    <div className="App">
      <MainPage />
      <Predict />
    </div>
  );
}

export default App;
