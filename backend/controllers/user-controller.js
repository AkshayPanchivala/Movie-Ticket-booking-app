const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("./../arrorhandler/Apperror");
const Booking = require("../models/Booking");


const getAllusers = asynchandler(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    user: user,
  });
});

//////////////user register/////////////////////
const signup = asynchandler(async (req, res, next) => {
  const {
    email,
    password,
    phonenumber,
    profilephoto,
    name,
    state,
    city,
    pincode,
  } = req.body;
  let missingValues = [];

  if (!email || typeof email == "number") missingValues.push("Email ");
  if (!password) missingValues.push("password ");
  if (!phonenumber || typeof phonenumber == "number")
    missingValues.push("PhoneNumber ");
  if (!profilephoto || typeof profilephoto == "number")
    missingValues.push("profilephoto");
  if (!name || typeof name == "number") missingValues.push("Name");
  if (!state || typeof state == "number") missingValues.push("State");
  if (!city || typeof city == "number") missingValues.push("City");
  if (!pincode || typeof pincode == "number") missingValues.push("Pincode");

  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required  values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }
  const existinguser = await User.findOne({ email: req.body.email });

  if (existinguser) {
    return res.status(409).json({
      message: "user already exists",
    });
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    password: req.body.password,
    profilephoto: req.body.profilephoto,
    state: req.body.state,
    city: req.body.city,
    pincode: req.body.pincode,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  res.status(201).json({
    user: user,
    token: token,
    message: "Account is created",
  });
});
const getuserbyid = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  if (!req.params.id || req.params.id.length !== 24) {
    return next(new AppError(`Wrong id`, 400));
  }
  const user = await User.findById(id);

  res.status(200).json({
    user: user,
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

/////////////////////////user login///////////////
const login = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;
 
  let missingValues = [];

  if (!email || typeof email == "number") missingValues.push("Email ");
  if (!password) missingValues.push("password ");

  if (missingValues.length > 0) {
    
    return next(
      new AppError(
        `required  values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }

  const existinguser = await User.findOne({ email: email }).select("+password");
  
  if (!existinguser) {
    return res.status(404).json({
      message: "user  is not found",
    });
  }
  const verifypassword = await bcrypt.compare(
    req.body.password,
    existinguser.password
  );

  if (verifypassword) {
    const token = jwt.sign(
      { id: existinguser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    return res.status(200).json({
      user: existinguser,
      token: token,
      message: "Account is login",
    });
  } else {
   
    return res.status(404).json({
      message: "Email or password wrong",
    });
  }
});



//////get Booking of user by id/////////////
const getBookingsOfUser = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  let bookings;

  bookings = await Booking.find({ user: id })
    .populate("movie", "title")
    .populate("theater", "name");

  if (!bookings) {
    return res.status(404).json({ message: "unable to get Bookings" });
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
  getuserbyid,
};
