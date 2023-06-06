require("dotenv").config();

const express = require("express");
const mongosanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const cors=require('cors');

const db = require("./utill/connection");

const userRouter = require("./routes/user-routes");

const movieRouter = require("./routes/movie-routes");
const BookingRouter = require("./routes/booking-routes");

const globalErrorHandler=require('./arrorhandler/globalerrorhandler');
const AppError=require('./arrorhandler/Apperror');
const theaterRouter = require("./routes/theater-routes");


const app = express();

//middle ware
app.use(express.json());
app.use(mongosanitize());
app.use(xss());
app.use(cors({}))
app.use("/user", userRouter);
app.use("/theater", theaterRouter);
app.use("/movie",movieRouter);
app.use("/booking",BookingRouter);

app.all('*',(req,res,next)=>{
  next(new AppError(`can't find this page`,404));
  
  });
  
app.use(globalErrorHandler);

db();

app.listen(process.env.PORT, () => {
  console.log(`app listening on ${process.env.PORT}`);
});
