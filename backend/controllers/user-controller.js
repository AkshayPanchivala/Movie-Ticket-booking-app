const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const AppError = require("./../arrorhandler/Apperror");
const Booking = require("../models/Booking");

const getAllusers = asynchandler(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    user: user,
  });
});

const signup = asynchandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  let missingValues = [];
  console.log(typeof name == "String");
  if (!name || typeof name == "String") missingValues.push("Name ");
  if (!email || typeof email == "String") missingValues.push("Email ");
  if (!password) missingValues.push("password ");
  console.log(missingValues);
  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required missing values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }
  const existinguser = await User.findOne({ email: email });

  if (existinguser) {
    return res.status(400).json({
      message: "user already exists",
    });
  }
  const user = await User.create(req.body);
  res.status(201).json({
    user: user,
    message: "Account is created",
  });
});

const updateprofile = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  if (!req.params.id || req.params.id.length !== 24) {
    return next(new AppError(`Wrong id`, 400));
  }
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    message: "Account is updated",
  });
});

const deleteprofile = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  if (!req.params.id || req.params.id.length !== 24) {
    return next(new AppError(`Wrong id`, 400));
  }

  const user = await User.findByIdAndDelete(id);
  res.status(200).json({
    user: user,
    message: "Account is deleted",
  });
});

const login = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body)
  let missingValues = [];

  if (!email || typeof email == "String") missingValues.push("Email ");
  if (!password) missingValues.push("password ");

  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required missing values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }
  const existinguser = await User.findOne({ email: email }).select("+password");
  console.log("kk"+ existinguser);
  const verifypassword = await bcrypt.compare(
    req.body.password,
    existinguser.password
  );
  console.log(verifypassword);
  if (verifypassword) {
    return res.status(200).json({
      user: existinguser,
      message: "Account is login",
    });
  } else {
    return res.status(404).json({
      message: "user  is not found",
    });
  }
});

const getBookingsOfUser = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  let bookings;

  bookings = await Booking.find({ user: id });

  if (!bookings) {
    return res.status(200).json({ message: "unable to get Bookings" });
  }
  return res.status(200).json({ bookings });
});
module.exports = {
  getAllusers,
  signup,
  updateprofile,
  deleteprofile,
  login,
  getBookingsOfUser,
};
