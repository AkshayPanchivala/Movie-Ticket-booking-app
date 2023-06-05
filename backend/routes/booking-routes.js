const express = require("express");
const {
  newBooking,
  getBookingById,
  deleteBooking,
  notAvailableSeat,
} = require("../controllers/booking_controller");

const BookingRouter = express.Router();

BookingRouter.route("/").post(newBooking);
BookingRouter.route("/notavailableseat/:movieid/:theatreid").post(
  notAvailableSeat
);
BookingRouter.route("/:id").get(getBookingById);
BookingRouter.route("/:id").delete(deleteBooking);

module.exports = BookingRouter;
