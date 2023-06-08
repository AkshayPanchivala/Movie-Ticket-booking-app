const { default: mongoose } = require("mongoose");
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const User = require("../models/User");
const { Parser } = require("json2csv");
const fs = require("fs");
const PdfPrinter = require("pdfmake");

const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, SeatType, ShowTime, user, theater } =
    req.body;
  console.log(date);
  const date1 = new Date(req.body.date).toLocaleString().split(",")[0];
  console.log(date1);
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
  // const time = ShowTime.toISOString().split("T")[0];
  try {
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
    booking = await Booking.findById(id);
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
    const booking = await Booking.findById(id);

    const userid = booking.user;
    const movieid = booking.movie;
    const user = await User.findById(userid);
    console.log("user" + user);
    const movie = await Movie.findById(movieid);
    console.log("movie" + movie);
    const index = movie.bookings.indexOf(id);
    const indexs = booking.user.bookings.indexOf(id);
    
      console.log("hjhjh");
      // Remove the ID from the array
      // const a = movie.bookings.splice(index, 1);
      // const b = user.bookings.splice(indexs, 1);
     
         Movie.findByIdAndUpdate(movieid, { $pull: { bookings: id } },(error, user) => {
          if (error) {
            console.log('Error updating user:', error);
            return;
          }
          console.log('User updated:', user);
        });
        User.findByIdAndUpdate(userid, { $pull: { bookings: id } }, (error, movie) => {
          if (error) {
            console.log('Error updating movie:', error);
            return;
          }
          console.log('Movie updated:', movie);
        });
       Booking.findByIdAndRemove(id)
      
      
    console.log(booking);
    // const index = booking.movie.bookings.indexOf(id);
    // const indexs = booking.user.bookings.indexOf(id);
    // if (index > -1) {
    //   console.log("hjhjh")
    //   // Remove the ID from the array
    //   await booking.movie.bookings.splice(index, 1);
    // }
    // if (indexs > -1) {
    //   console.log("lklkl");
    //   await booking.user.bookings.splice(indexs, 1);
    // }
    // const b = await booking.save();
    // const c = await Booking.findByIdAndRemove(id);
    // return res.status(200).json({ message: "Successfully Deleted" });

    // console.log(booking);
    // const updatedmoviemodel = booking.movie.bookings.filter(
    //   (model) => model !== id
    // );
    // console.log(booking.movie.bookings.filter((model) => model !== id));
    // console.log(updatedmoviemodel);
    // const updatedusermodel = booking.user.bookings.filter(
    //   (model) => model !== id
    // );
    // console.log(updatedusermodel);
  } catch (err) {}
  //   const user = await User.find({ bookings: req.params.id });

  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  //   booking = await Booking.findByIdAndRemove(id).populate("user movie");

  //   await booking.user.bookings.pull(booking);

  //   const bookings = await booking.movie.bookings.pull(booking._id);

  //   // const a = await Movie.findByIdAndUpdate(booking.movie._id, booking.movie, {
  //   //   new: true,
  //   //   runValidators: true,
  //   // });

  //   console.log("kjk" + a);
  //   await User.findByIdAndUpdate(booking.user._id, booking.user, {
  //     new: true,
  //     runValidators: true,
  //   });

  //   // console.log(booking.movie._id);
  //   session.commitTransaction();
  // } catch (err) {
  //   return console.log(err);
  // }
  // if (!booking) {
  //   return res.status(500).json({ message: "Unable to Delete" });
  // }
  // return res.status(200).json({ message: "Successfully Deleted" });
};

const notAvailableSeat = async (req, res, next) => {
  const movieid = req.params.movieid;
  const adminid = req.params.theatreid;
  const showdate = req.body.ShowDate;
  const date = new Date(req.body.ShowDate).toLocaleString().split(",")[0];
  console.log(date);
  console.log(showdate + "sdjlkfdh");

  console.log(date);
  const blocked = [];

  const seat = await Booking.find({
    movie: movieid,
    theater: adminid,
    ShowTime: req.body.ShowTime,
    date: date,
  });

  console.log(seat);

  console.log(seat);
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
  console.log("klklklk");
  const date = new Date(req.body.date).toLocaleString().split(",")[0];
  console.log(date);
  const booking = await Booking.find({
    theater: req.body.theater,
    ShowTime: req.body.showtime,
    date: date,
  })
    .populate("user", "name email")
    .populate("movie", "title");
  console.log(booking);
  res.status(200).json({
    booking: booking,
  });
};
module.exports = {
  newBooking,
  getBookingById,
  deleteBooking,
  notAvailableSeat,
  getbookingbyadmin,
};
