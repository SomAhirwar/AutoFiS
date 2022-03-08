import React from "react";
import MainPage from "../MainPage/MainPage";
import Predict from "../Predict/Predict";

function Home() {
  return (
    <div className="home">
      <MainPage />
      <Predict />
    </div>
  );
}

export default Home;
