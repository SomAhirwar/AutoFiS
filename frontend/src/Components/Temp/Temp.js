import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";

function Temp(props) {
  const [imageURL, setimageURL] = useState("");
  const [prediction, setPrediction] = useState("");
  useEffect(() => {
    console.log(props);
    // async function submitImage() {
    //   setPrediction("");
    //   const uploadFormData = new FormData();
    //   uploadFormData.append("image", image);
    //   const res = await axios.post("/ML", uploadFormData);
    //   setPrediction(res.data.data.name);
    //   setimageURL(URL.createObjectURL(image));
    // }

    // submitImage();
  }, []);
  return (
    <div>
      <Typography variant="h2">{prediction}</Typography>
      <img src={imageURL} alt="fish" />
      <Typography variant="h4">Predicted Fish: {prediction}</Typography>
    </div>
  );
}

export default Temp;
