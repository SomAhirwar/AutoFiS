import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { fishes, fishNutrition } from "../../utility/fishInfo";
import Table from "../Table/Table";

function Temp(props) {
  const [imageURL, setimageURL] = useState("");
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [fishObjName, setFishObjName] = useState("");
  const location = useLocation();
  const image = location?.state?.image;
  useEffect(() => {
    async function submitImage() {
      setPrediction("");
      const uploadFormData = new FormData();
      uploadFormData.append("image", image);
      const res = await axios.post("/ML", uploadFormData);
      setPrediction(res.data.data.name);
      setConfidence(res.data.data.confidence);
      setimageURL(URL.createObjectURL(image));
    }
    setFishObjName(prediction.replace(/\s|-/g, "_").toUpperCase());
    console.log(prediction.replace(/\s|-/g, "_").toUpperCase());

    submitImage();
  }, []);

  console.log(fishNutrition);
  console.log({
    test: setFishObjName[prediction.replace(/\s|-/g, "_").toUpperCase()],
  });
  return (
    <div>
      <Typography variant="h2">{prediction}</Typography>
      <img
        style={{
          border:
            fishes[prediction.replace(/\s|-/g, "_").toUpperCase()] &&
            fishes[prediction.replace(/\s|-/g, "_").toUpperCase()].endangered
              ? "15px solid red"
              : "15px solid green",
          maxWidth: "55%",
          borderRadius: "15px",
        }}
        src={imageURL}
        alt="fish"
      />
      <Typography
        variant="h3"
        style={{
          color: "red",
        }}
      >
        {fishes[prediction.replace(/\s|-/g, "_").toUpperCase()] &&
        fishes[prediction.replace(/\s|-/g, "_").toUpperCase()].endangered
          ? "ENDANGERED"
          : ""}
      </Typography>
      <Typography variant="h4">Predicted Fish: {prediction}</Typography>
      <Typography variant="h4">Confidence: {confidence}%</Typography>
      <h2 style={{ fontSize: "30px", margin: "30px 0 20px 0" }}>Information</h2>
      <Table
        prediction={prediction.replace(/\s|-/g, "_").toUpperCase()}
        obj={fishes[prediction.replace(/\s|-/g, "_").toUpperCase()]}
      />
      <h2 style={{ fontSize: "30px", margin: "30px 0 20px 0" }}>Nutritions</h2>
      <Table
        prediction={prediction.replace(/\s|-/g, "_").toUpperCase()}
        obj={fishNutrition[prediction.replace(/\s|-/g, "_").toUpperCase()]}
      />
    </div>
  );
}

export default Temp;
