import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Temp(props) {
  const [imageURL, setimageURL] = useState("");
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const location = useLocation();
  const image = location.state.image;
  useEffect(() => {
    async function submitImage() {
      setPrediction("");
      const uploadFormData = new FormData();
      uploadFormData.append("image", image);
      const res = await axios.post("/ML", uploadFormData);
      console.log(res);
      setPrediction(res.data.data.name);
      setConfidence(res.data.data.confidence);
      setimageURL(URL.createObjectURL(image));
    }

    submitImage();
  }, []);
  return (
    <div>
      <Typography variant="h2">{prediction}</Typography>
      <img src={imageURL} alt="fish" />
      <Typography variant="h4">Predicted Fish: {prediction}</Typography>
      <Typography variant="h4">Confidence: {confidence}%</Typography>
    </div>
  );
}

export default Temp;
