import logo from "./logo.svg";
import "./App.css";
import MainPage from "./Components/MainPage/MainPage";
import Predict from "./Components/Predict/Predict";
import { Typography } from "@material-ui/core/";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Temp from "./Components/Temp/Temp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/predict" exact render={() => <Temp />} />
        </Switch>
      </BrowserRouter>
      <div>{/* <Typography variant="=" */}</div>
    </div>
  );
}

export default App;
