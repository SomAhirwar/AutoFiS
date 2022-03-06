const express=require('express'); //requiring express
//const { nextTick } = require('process');

const app=express();  //invoking express with name = app
const cookieParser=require('cookie-parser');
//middleware
app.use(express.json());
app.listen(3000);
app.use(cookieParser());

const userRouter=require('./Routers/userRouter');
//const authRouter=require('./Routers/authRouter');
//base route
app.use('/user',userRouter);