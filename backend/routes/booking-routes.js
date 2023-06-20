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

const BookingRouter = express.Router();

BookingRouter.route("/orders").post(order);
BookingRouter.route("/verify").post(verify);
BookingRouter.route("/").post(newBooking);

BookingRouter.route("/download").post(getbookingbyadmin);
BookingRouter.route("/notavailableseat/:movieid/:theatreid").post(
  notAvailableSeat
);
BookingRouter.route("/:id").get(getBookingById);
BookingRouter.route("/:id").delete(deleteBooking);

module.exports = BookingRouter;
