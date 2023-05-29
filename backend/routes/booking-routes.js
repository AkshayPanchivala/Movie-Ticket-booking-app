const express = require("express");
const {
  newBooking,
  getBookingById,
  deleteBooking,
} = require("../controllers/booking_controller");

const BookingRouter = express.Router();

BookingRouter.route("/").post(newBooking);
BookingRouter.route("/:id").get(getBookingById);
BookingRouter.route("/:id").delete(deleteBooking);

module.exports = BookingRouter;
