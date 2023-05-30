// const asynchandler = require("express-async-handler");
// const { default: mongoose } = require("mongoose");

// const Booking = require("../models/booking");
// const Movie = require("../models/Movie");
// const User = require("../models/User");

// const newBooking = asynchandler(async (req, res, next) => {
//   console.log("klklk");
//   const { movie, date, seatNumber, user } = req.body;
//   let existingUser;
//   let existingMovie;
//   try {
//     existingMovie = await Movie.findById(movie);
//     existingUser = await User.findById(user);
//   } catch (err) {
//     console.log("klklljk");
//   }
//   console.log(existingMovie);
//   console.log(existingUser);
//   if (!existingMovie) {
//     return res.status(404).json({ message: "Movie Not Found" });
//   }
//   if (!user) {
//     return res.status(404).json({ message: "user not found" });
//   }
//   let booking;
//   booking = new Booking({ movie, date: new Date(`${date}`), seatNumber, user });
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   existingUser.bookings.push(booking);
//   existingMovie.bookings.push(booking);
//   console.log("kjjkk5j");
//   await existingUser.save({ session });
//   await existingMovie.save({ session });
//   await booking.save({ session });
//   session.commitTransaction();
//   //   booking = await Booking.create(req.body);
//   res.status(201).json({
//     message: "your ticket is book",
//   });
// });

const mongoose = require("mongoose");
const Bookings = require("../models/Booking");
const Movie = require("./../models/Movie");
const User = require("./../models/User");

// import Movie from "../models/Movie";
// import User from "../models/User";

// const newBooking = async (req, res, next) => {
//   const { movie, date, seatNumber, user } = req.body;

//   let existingMovie;
//   let existingUser;
//   try {
//     existingMovie = await Movie.findById(movie);
//     existingUser = await User.findById(user);
//   } catch (err) {
//     return console.log(err);
//   }
//   if (!existingMovie) {
//     return res.status(404).json({ message: "Movie Not Found With Given ID" });
//   }
//   if (!user) {
//     return res.status(404).json({ message: "User not found with given ID " });
//   }
//   let booking;

//   try {
//     booking = new Bookings({
//       movie,
//       user,
//       seatNumber,
//       date: new Date(`${date}`),
//     });
//     console.log(booking);
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     existingUser.bookings.push(booking._id);
//     console.log(booking._id);
//     existingMovie.bookings.push(booking._id);
//     console.log();
//     console.log("lklkl");
//     console.log(existingUser + "and" + existingMovie);
//     // console.log({ session });

//     await existingUser.save({ session });
//     await existingMovie.save({ session });
//     await booking.save({ session });
//     session.commitTransaction();
//   } catch (err) {
//     return console.log(err);
//   }

//   if (!booking) {
//     return res.status(500).json({ message: "Unable to create a booking" });
//   }

//   return res.status(201).json({ booking });
// };

// const getBookingById = async (req, res, next) => {
//   const id = req.params.id;
//   let booking;
//   try {
//     booking = await Bookings.findById(id);
//   } catch (err) {
//     return console.log(err);
//   }
//   if (!booking) {
//     return res.status(500).json({ message: "Unexpected Error" });
//   }
//   return res.status(200).json({ booking });
// };

// const deleteBooking = async (req, res, next) => {
//   const id = req.params.id;
//   let booking;
//   try {
//     booking = await Bookings.findByIdAndRemove(id).populate("user movie");
//     console.log(booking);
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     await booking.user.bookings.pull(booking);
//     await booking.movie.bookings.pull(booking);
//     await booking.movie.save({ session });
//     await booking.user.save({ session });
//     session.commitTransaction();
//   } catch (err) {
//     return console.log(err);
//   }
//   if (!booking) {
//     return res.status(500).json({ message: "Unable to Delete" });
//   }
//   return res.status(200).json({ message: "Successfully Deleted" });
// };

const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found with given ID " });
  }
  let booking;

  try {
    booking = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking._id);
    existingMovie.bookings.push(booking._id);
    console.log(existingMovie);
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
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking });
};

const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};
//deletebooking  baki che   
const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    const booking = await Bookings.findById(id).populate("user movie");
    console.log(booking);
    const user = await User.find({ bookings: req.params.id });
    console.log("a" + user.bookings);

    const session = await mongoose.startSession();
    session.startTransaction();
    booking = await Bookings.findByIdAndRemove(id).populate("user movie");
    console.log("booking" + booking);
    await booking.user.bookings.pull(booking);
    console.log(booking._id);
    console.log(booking.user.bookings.pull(booking._id));
    const bookings = await booking.movie.bookings.pull(booking._id);
    console.log("jjjj" + bookings);
    console.log(booking.movie.bookings.pull(booking._id));
    console.log(booking.movie._id);
    console.log("lkkk", +booking.movie);

    // const a = await Movie.findByIdAndUpdate(booking.movie._id, booking.movie, {
    //   new: true,
    //   runValidators: true,
    // });

    console.log("kjk" + a);
    await User.findByIdAndUpdate(booking.user._id, booking.user, {
      new: true,
      runValidators: true,
    });

    // console.log(booking.movie._id);
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};

module.exports = { newBooking, getBookingById, deleteBooking };
