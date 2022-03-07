import React, { useState, useEffect, Fragment, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import {
  Backdrop,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Button,
  Typography,
} from "@mui/material";

const useStyle = makeStyles((theme) => {
  return {
    button: {
      marginTop: "20px !important",
      width: "100%",
    },
  };
});

function Predict() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const classes = useStyle();

  const imageRef = useRef();

  async function submitImage() {
    setPrediction("");
    const uploadFormData = new FormData();
    uploadFormData.append("image", image);
    const res = await axios.post("/ML", uploadFormData);
    setPrediction(res.data.data.name);
    console.log(prediction);
  }

  return (
    <Fragment>
      <Grid
        container
        className="App"
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop="12%"
      >
        <Grid item>
          <h1 style={{ textAlign: "center", marginBottom: "1.5em" }}>
            Upload Your Fish to Know Your Fish
          </h1>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Add an image"}
            onChange={(ev) => {
              console.log(ev);
              setImage(ev[0]);
            }}
            maxFileSize={10000000}
            filesLimit={1}
            showAlerts={["error"]}
          />
          <Button
            className={classes.button}
            variant="contained"
            onClick={submitImage}
          >
            Predict
          </Button>
          <Typography variant="h4">Predicted Fish: {prediction}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Predict;
