const { default: mongoose } = require("mongoose");
const asynchandler = require("express-async-handler");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const User = require("../models/User");
const sendEmail = require("../utill/email");
const Theater = require("../models/Theater");
const AppError = require("../arrorhandler/Apperror");

///////Payment Process
const order = asynchandler(async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  instance.orders.create(options, (error, order) => {
    if (error) {
      return res.status(500).json({ message: "Something Went Wrong!" });
    }
    res.status(200).json({ data: order });
  });
});

const verify = asynchandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    return res.status(200).json({ message: "Payment verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid signature sent!" });
  }
});

////create a Booking
const newBooking = asynchandler(async (req, res, next) => {
  const {
    movie,
    date,
    seatNumber,
    SeatType,
    ShowTime,
    user,
    theater,
    paymentId,
  } = req.body;

  let missingValues = [];

  if (!movie || typeof movie == "number") missingValues.push("movie");
  if (!seatNumber || typeof seatNumber == "number")
    missingValues.push("SeatNumber ");
  if (!SeatType || typeof SeatType == "number") missingValues.push("SeatType ");
  if (!ShowTime || typeof ShowTime == "number") missingValues.push("ShowTime ");

  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required missing values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }
  if (!paymentId || typeof paymentId == "number") {
    return res.status(400).json({ message: "Your payment is not except" });
  }
  const date1 = new Date(req.body.date).toLocaleString().split(",")[0];

  let existingMovie;
  let existingUser;

  existingMovie = await Movie.findById(movie);
  existingUser = await User.findById(user);
  existingTheater = await Theater.findById(theater);
  await Movie.findByIdAndUpdate(existingMovie._id, existingMovie, {
    new: true,
    runValidators: true,
  });
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found with given ID " });
  }
  let booking;

  booking = new Booking({
    movie,
    date: date1,
    seatNumber,
    user,
    theater,
    SeatType,
    ShowTime,
    paymentId,
  });
  const session = await mongoose.startSession();
  session.startTransaction();
  existingUser.bookings.push(booking._id);
  existingMovie.bookings.push(booking._id);

  await User.findByIdAndUpdate(existingUser._id, existingUser, {
    new: true,
    runValidators: true,
  });
  await Movie.findByIdAndUpdate(existingMovie._id, existingMovie, {
    new: true,
    runValidators: true,
  });

  await booking.save({ session });
  session.commitTransaction();

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  const message = `Dear ${existingUser.name},

Thank you for booking tickets for  ${
    existingMovie.title
  }. Your booking has been confirmed.

Booking Details:
Movie:  ${existingMovie.title}
Date: ${booking.date}
Time: ${booking.ShowTime}
Theater Name:${existingTheater.name}
Theater Address:${existingTheater.address}
Number of Tickets: ${booking.seatNumber.length}
Your SeatNumber: ${booking.seatNumber + ","}




Please note the following information:

- Show up at the theater at least [Arrival Time] minutes before the showtime.
- Kindly carry a valid ID proof for verification at the theater.
- In case of any queries or changes, feel free to contact our customer support team at 9328899248.

Thank you once again for choosing our service. We hope you enjoy the movie!

Best regards,
Akshay panchivala`;

  await sendEmail({
    email: existingUser.email,
    subject: `Booking Confirmation - ${existingMovie.title}`,
    message,
  });
  return res.status(201).json({ booking });
});

///get booking by userID///////////////////

const getBookingById = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  const page = req.query.page || 1;
  const limit = req.query.limit || 4;

  let booking;

  const totalBookingsCount = await Booking.countDocuments({ user: id });

  const totalPages = Math.ceil(totalBookingsCount / limit);

  booking = await Booking.find({ user: id })
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("movie", "title")
    .populate("theater", "name")
    .exec();

  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking, totalPages });
});

///////delete Booking by User////////////////////
const deleteBooking = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  const booking = await Booking.findById(id);

  const movie = booking.movie;
  const userid = booking.user;

  const user = await User.findByIdAndUpdate(
    userid,
    { $pull: { bookings: id } },
    { new: true }
  );

  const movieDeleteion = await Movie.findByIdAndUpdate(
    movie,
    { $pull: { bookings: id } },
    { new: true }
  );

  const bookingDeletion = await Booking.findByIdAndDelete(id);

  return res.status(200).json({
    message: "booking deleted",
  });
});

////////////////Not available seat////////////////////////

const notAvailableSeat = asynchandler(async (req, res, next) => {
  const movieid = req.params.movieid;
  const adminid = req.params.theatreid;
  const showdate = req.body.ShowDate;
  const date = new Date(req.body.ShowDate).toLocaleString().split(",")[0];

  const blocked = [];

  const seat = await Booking.find({
    movie: movieid,
    theater: adminid,
    ShowTime: req.body.ShowTime,
    date: date,
  });

  seat.map((e) => {
   
    e.seatNumber.map((e) => {
      blocked.push(e);
    });
  });
  res.status(200).json({
    notavailable: blocked,
  });
});

////////get Booking by theater//////////

const getbookingbyadmin = asynchandler(async (req, res, next) => {
  const date = new Date(req.body.date).toLocaleString().split(",")[0];

  const booking = await Booking.find({
    theater: req.body.theater,
    ShowTime: req.body.showtime,
    movie: req.body.movie,
    date: date,
  })
    .populate("user", "name email")
    .populate("movie", "title");

  if (booking.length === 0) {
    return res.status(200).json({
      message: "any booking not found",
    });
  }

  res.status(200).json({
    booking: booking,
  });
});

module.exports = {
  order,
  verify,
  newBooking,
  getBookingById,
  deleteBooking,
  notAvailableSeat,
  getbookingbyadmin,
};
