import React, { useState, useEffect, Fragment } from "react";
import * as tf from "@tensorflow/tfjs";

import { DropzoneArea } from "material-ui-dropzone";
import { Backdrop, Chip, CircularProgress, Grid, Stack } from "@mui/material";

function Predict() {
  const [model, setModel] = useState(null);
  const [classLabels, setClassLabels] = useState(null);

  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [predictedClass, setPredictedClass] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const model_url = "ML/model.json";
      const model = await tf.loadLayersModel(model_url);

      setModel(model);
      console.log({ model });
    };

    const getClassLabels = async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/anishathalye/imagenet-simple-labels/master/imagenet-simple-labels.json"
      );

      const data = await res.json();

      setClassLabels(data);
    };

    loadModel();
    getClassLabels();
  }, []);

  const readImageFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);

      reader.readAsDataURL(file);
    });
  };

  const createHTMLImageElement = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => resolve(img);

      img.src = imageSrc;
    });
  };

  const handleImageChange = async (files) => {
    if (files.length === 0) {
      setConfidence(null);
      setPredictedClass(null);
    }

    if (files.length === 1) {
      setLoading(true);

      const imageSrc = await readImageFile(files[0]);
      const image = await createHTMLImageElement(imageSrc);

      // tf.tidy for automatic memory cleanup
      const [predictedClass, confidence] = tf.tidy(() => {
        const tensorImg = tf.browser
          .fromPixels(image)
          .resizeNearestNeighbor([300, 300])
          .toFloat()
          .expandDims(0);
        console.log(tensorImg);

        // resize = tf.fromPixels(image).resizeBilinear([300, 300, 4]);
        // // const img = document.getElementById("myimg");
        // const tfImg = tf.fromPixels(image);
        // const smalImg = tf.image.resizeBilinear(tfImg, [368, 432]);
        // const finalImg = tf.expand_dims(smalImg, 4);
        // const resized = tf.cast(smalImg, "float32");
        // const t4d = tf.tensor4d(Array.from(resized.dataSync()), [
        //   1,
        //   368,
        //   432,
        //   3,
        // ]);
        console.log(tensorImg);
        const result = model.predict(tensorImg);
        console.log(result);
        const predictions = result.dataSync();
        const predicted_index = result.as1D().argMax().dataSync()[0];

        const predictedClass = classLabels[predicted_index];
        const confidence = Math.round(predictions[predicted_index] * 100);

        return [predictedClass, confidence];
      });

      setPredictedClass(predictedClass);
      setConfidence(confidence);
      setLoading(false);
    }
  };

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
            MobileNetV3 Image Classifier
          </h1>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Add an image"}
            onChange={handleImageChange}
            maxFileSize={10000000}
            filesLimit={1}
            showAlerts={["error"]}
          />
          <Stack
            style={{ marginTop: "2em", width: "12rem" }}
            direction="row"
            spacing={1}
          >
            <Chip
              label={
                predictedClass === null
                  ? "Prediction:"
                  : `Prediction: ${predictedClass}`
              }
              style={{ justifyContent: "left" }}
              variant="outlined"
            />
            <Chip
              label={
                confidence === null
                  ? "Confidence:"
                  : `Confidence: ${confidence}%`
              }
              style={{ justifyContent: "left" }}
              variant="outlined"
            />
          </Stack>
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}

export default Predict;
