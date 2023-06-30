const express = require("express");

const theaterRouter = express.Router();
const {
  TheaterSignup,
  TheaterLogin,
  getTheater,
  getTheaterById,
  getTheaterbypagination,
  gettheaterbyCity,
  getallTheater,
  updateprofile,
  gettodaybooking,
  deletetheater,
} = require("./../controllers/theater-controller");
const Adminprotect = require("./../Auth/Adminprotect");
const Theaterprotect = require("./../Auth/Theaterprotect");

theaterRouter.route("/signup").post(Adminprotect, TheaterSignup);
theaterRouter.route("/login").post(TheaterLogin);

theaterRouter.route("/todaybooking/:id").get(Theaterprotect, gettodaybooking);

theaterRouter.route("/theatercity").get(getallTheater);
theaterRouter.route("/").get(getTheater).post(gettheaterbyCity);
theaterRouter.route("/getTheaterbypagination").post(getTheaterbypagination);
theaterRouter
  .route("/:id")
  .get(getTheaterById)
  .put(Theaterprotect, updateprofile)
  .delete(Adminprotect, deletetheater);

module.exports = theaterRouter;
