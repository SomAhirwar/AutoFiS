const express = require("express"); //requiring express
//const { nextTick } = require('process');
const path = require("path");

const app = express(); //invoking express with name = app
const cookieParser = require("cookie-parser");
//middleware
app.use(express.json());
app.listen(8888);
app.use(cookieParser());

const userRouter = require("./Routers/userRouter");
//const authRouter=require('./Routers/authRouter');
const MLRouter = require("./Routers/MLRouter");

app.use((req, res, next) => {
  console.log(req.body);
  next();
});
//base route
app.use("/user", userRouter);
app.use("/ML", MLRouter);
app.use("/public", express.static(path.join(__dirname, "public")));
