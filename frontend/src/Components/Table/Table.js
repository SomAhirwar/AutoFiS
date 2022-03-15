import React from "react";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { fishes } from "../../utility/fishInfo";

const useStyle = makeStyles((theme) => {
  return {
    root: {
      width: "65%",
      "& > *": {
        marginBottom: "10px",
        padding: "5px",
      },
    },
    leftBox: {
      backgroundColor: "lightBlue",
    },
    rightBox: {
      backgroundColor: "lightgrey",
    },
  };
});

function Table({ prediction, obj, heading }) {
  console.log(prediction);
  const classes = useStyle();
  console.log({ prediction });
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid className={classes.root} container spacing={3}>
        {obj
          ? Object.entries(obj).map(([key, value]) => {
              return (
                <>
                  <Grid className={classes.leftBox} container item xs={4}>
                    {key}
                  </Grid>
                  <Grid className={classes.rightBox} container item xs={8}>
                    {value}
                  </Grid>
                </>
              );
            })
          : null}
      </Grid>
    </div>
  );
}

export default Table;
