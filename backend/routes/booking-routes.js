const express = require("express");
const {
  newBooking,
  getBookingById,
  deleteBooking,
  notAvailableSeat,
  getbookingbyadmin,
  order,
  verify,
} = require("../controllers/booking-controller");
const Userprotect = require("../Auth/Userprotect");
const Theaterprotect = require("../Auth/Theaterprotect");
// const Theaterprotect=require("../Auth/Theaterprotect")
const BookingRouter = express.Router();

BookingRouter.route("/orders").post(order);
BookingRouter.route("/verify").post(verify);
BookingRouter.route("/").post(Userprotect, newBooking);

BookingRouter.route("/download").post(Theaterprotect,getbookingbyadmin);
BookingRouter.route("/notavailableseat/:movieid/:theatreid").post(
  notAvailableSeat
);
BookingRouter.route("/:id").get(Userprotect, getBookingById);
BookingRouter.route("/:id").delete(Userprotect, deleteBooking);

module.exports = BookingRouter;
