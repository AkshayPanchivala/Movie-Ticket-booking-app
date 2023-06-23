const express = require("express");

const theaterRouter = express.Router();
const {
  TheaterSignup,
  TheaterLogin,
  getTheater,
  getTheaterById,
  getTheaterbypagination,
  gettheaterbyCity,
} = require("./../controllers/theater-controller");
const Adminprotect = require("./../Auth/Adminprotect");

theaterRouter.route("/signup").post(Adminprotect, TheaterSignup);
theaterRouter.route("/login").post(TheaterLogin);
theaterRouter.route("/").get(getTheater).post(gettheaterbyCity);
theaterRouter.route("/getTheaterbypagination").post(getTheaterbypagination);
theaterRouter.route("/:id").get(getTheaterById);


module.exports = theaterRouter;
