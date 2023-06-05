const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  seatNumber: [
    {
      type: String,
      required: true,
    },
  ],
  SeatType: {
    type: String,
    required: true,
  },
  ShowTime: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
