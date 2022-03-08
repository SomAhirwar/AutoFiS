import React from "react";

function UploadBox() {
  return (
    <Fragment>
      <Grid
        container
        className="App"
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop="60px"
      >
        <Grid item>
          <Typography className={classes.text} variant="h3">
            Upload Your Fish to Know Your Fish
          </Typography>
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
          <img src={imageURL} alt="Your Image" />
          <Typography variant="h4">Predicted Fish: {prediction}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default UploadBox;
