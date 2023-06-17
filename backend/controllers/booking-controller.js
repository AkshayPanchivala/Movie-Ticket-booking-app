const { default: mongoose } = require("mongoose");
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");

const Razorpay = require("razorpay");
const crypto = require("crypto");

const order = async (req, res) => {
  console.log("lklk");
  try {
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
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

const verify = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

// module.exports = router;
const newBooking = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { movie, date, seatNumber, SeatType, ShowTime, user, theater } =
    req.body;

  const date1 = new Date(req.body.date).toLocaleString().split(",")[0];

  let existingMovie;
  let existingUser;

  existingMovie = await Movie.findById(movie);
  existingUser = await User.findById(user);

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

  return res.status(201).json({ booking });
});

const getBookingById = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const page = req.query.page || 1;
  const limit = req.query.limit || 3;

  let booking;

  const totalBookingsCount = await Booking.countDocuments({ user: id });

  const totalPages = Math.ceil(totalBookingsCount / limit);

  booking = await Booking.find({ user: id })
    .sort({ date: 1 })
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

const deleteBooking = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const booking = await Booking.findById(id);

  const movie = await booking.movie;
  const userid = await booking.user;

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

const notAvailableSeat = async (req, res, next) => {
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
    console.log(e.seatNumber);
    e.seatNumber.map((e) => {
      blocked.push(e);
    });
  });
  res.status(200).json({
    notavailable: blocked,
  });
};
const getbookingbyadmin = async (req, res, next) => {
  console.log("lkllk");

  const date = new Date(req.body.date).toLocaleString().split(",")[0];

  const booking = await Booking.find({
    theater: req.body.theater,
    ShowTime: req.body.showtime,
    movie: req.body.movie,
    date: date,
  })
    .populate("user", "name email")
    .populate("movie", "title");
  console.log(booking);
  if (booking.length === 0) {
    return res.status(200).json({
      message: "any booking not found",
    });
  }
  res.status(200).json({
    booking: booking,
  });
};
module.exports = {
  order,
  verify,
  newBooking,
  getBookingById,
  deleteBooking,
  notAvailableSeat,
  getbookingbyadmin,
};
