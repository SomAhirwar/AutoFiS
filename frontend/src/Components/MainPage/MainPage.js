import React from "react";
import { Typography, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      height: "550px",
      backgroundImage: (props) =>
        `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url("${props.backgroundImg}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
      position: "relative",
    },
    logo: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },

    rootNav: {
      display: "flex",
      justifyContent: "space-between",
      // padding: "0 100px",
      marginTop: "10px",
      width: "50%",
      marginLeft: "150px",
    },

    list: {
      display: "flex",
      width: "400px",
      justifyContent: "space-around",
      alignItems: "center",
    },
    button: {
      color: "white",
    },

    heroText: {
      position: "absolute",
      bottom: "50px",
      left: "150px",
    },
  };
});

function MainPage() {
  const classes = useStyle({
    backgroundImg: `${process.env.PUBLIC_URL}/hero-img.jpg`,
  });
  console.log(classes);
  return (
    <div>
      <header className={classes.root}>
        &nbsp;
        <div className={classes.rootNav}>
          <img className={classes.logo} src="/logo.png" />
          <ul className={classes.list}>
            <Button className={classes.button}>Predict</Button>
            <Button className={classes.button}>About Us</Button>
            <Button className={classes.button}>Contact Us</Button>
            <Button className={classes.button}>Usage</Button>
          </ul>
        </div>
        <Typography variant="h1" className={classes.heroText}>
          AutoFiS
        </Typography>
      </header>
      <section></section>
    </div>
  );
}

export default MainPage;
