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
import Temp from "../Temp/Temp";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => {
  return {
    button: {
      marginTop: "20px !important",
      width: "100%",
    },
    heading: {
      marginButtom: "30px !important",
    },
  };
});

function Predict() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [changed, setChanged] = useState(false);
  const classes = useStyle();
  const history = useHistory();

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
        marginTop="75px"
      >
        <Grid item>
          <Typography variant="h3" className={classes.heading}>
            Upload Your Fish to Know Your Fish
          </Typography>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Add an image"}
            onChange={(ev) => {
              setImage(ev[0]);
              console.log(ev.length > 0);
              // if (ev.length > 0)
              //   history.push({
              //     pathname: "/predict",
              //     state: { image: ev[0] },
              //   });
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
