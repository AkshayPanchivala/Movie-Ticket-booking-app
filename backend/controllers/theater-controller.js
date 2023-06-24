const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Theater = require("../models/Theater");
const User = require("../models/User");
const AppError = require("../arrorhandler/Apperror");

///////////Theater SignUp///////////////////////////////
const TheaterSignup = asynchandler(async (req, res, next) => {
  const {
    email,
    password,
    phonenumber,
    profilephoto,
    name,
    state,
    city,
    pincode,
    address,
  } = req.body;
  let missingValues = [];

  if (!email || typeof email == "number") missingValues.push("Email ");
  if (!password) missingValues.push("Password ");
  if (!phonenumber || typeof phonenumber == "number")
    missingValues.push("PhoneNumber ");
  if (!profilephoto || typeof profilephoto == "number")
    missingValues.push("ProfilePhoto");
  if (!name || typeof name == "number") missingValues.push("Name");
  if (!address || typeof address == "number") missingValues.push("Address");

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

  const existingtheater = await Theater.findOne({ email: req.body.email });

  if (existingtheater) {
    return res.status(409).json({
      message: "Theater already exists",
    });
  }
  const theater = await Theater.create({
    name: req.body.name,
    email: req.body.email,
    phonenumber: +req.body.phonenumber,
    password: req.body.password,
    profilephoto: req.body.profilephoto,
    state: req.body.state,
    city: req.body.city,
    pincode: req.body.pincode,
    address: req.body.address,
  });

  const token = jwt.sign({ id: theater._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  res.status(201).json({
    theater: theater,
    token: token,
    message: "New Theater Added",
  });
});

////////////////////////Theater Login//////////////////////////////////////

const TheaterLogin = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;
  let missingValues = [];

  if (!email || typeof email == "number") missingValues.push("Email ");
  if (!password) missingValues.push("password ");

  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required missing values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }
  const existingtheater = await Theater.findOne({ email: email });
  if (!existingtheater) {
    res.status(404).json({
      message: "Not Found",
    });
  }
  const verifypassword = await bcrypt.compare(
    req.body.password,
    existingtheater.password
  );
  

  if (verifypassword) {
    const token = jwt.sign(
      { id: existingtheater._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    return res.status(200).json({
      theater: existingtheater,
      token: token,
      message: "login successfull",
    });
  }
  if (!verifypassword) {
    return res.status(404).json({
      message: "Admin Email id or Password Wrong",
    });
  }
});



/////////////////Get all theater//////////////////////
const getTheater = asynchandler(async (req, res, next) => {
  let admins;

  const page = req.query.page || 1;
  const limit = req.query.limit || 6;

  const totaltheater = await Theater.countDocuments();

  const totalPages = Math.ceil(totaltheater / limit);
  admins = await Theater.find()
    .skip((page - 1) * limit)
    .limit(limit);
  if (!admins) {
    return res.status(404).json({ message: "Not found data" });
  }
  return res.status(200).json({ data: admins, totalPages: totalPages });
});
const getallTheater = asynchandler(async (req, res, next) => {
  let admins;




  admins = await Theater.find()

  if (!admins) {
    return res.status(404).json({ message: "Not found data" });
  }
  return res.status(200).json({ data: admins});
});
//////////////////////////get Theater by user register city//////////////////////
const getTheaterbypagination = asynchandler(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 4;

  const user = await User.findOne({ _id: req.body.id });

  const totalBookingsCount = await Theater.countDocuments({
    pincode: user.pincode,
  });

  const totalPages = Math.ceil(totalBookingsCount / limit);

  const theater = await Theater.find({ pincode: user.pincode })
    .skip((page - 1) * limit)
    .limit(limit);
  res.status(200).json({ theater: theater, totalPages: totalPages });
});



////////////////////////////////Get theater by theater Id////////////////////////////////////////////
const getTheaterById = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  const admin = await Theater.findById(id);

  if (!admin) {
    return res.status(404).json({
      message: "Invalid Movie ID",
    });
  }
  return res.status(200).json({ admin: admin });
});





////////////////////////////////get theater by city//////////////////////////////////
const gettheaterbyCity = asynchandler(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 4;

  const totalTheatersCount = await Theater.countDocuments({
    city: req.body.city,
  });

  const totalPages = Math.ceil(totalTheatersCount / limit);

  const theater = await Theater.find({ city: req.body.city })
    .skip((page - 1) * limit)
    .limit(limit);
  res.status(200).json({ theater: theater, totalPages: totalPages });
});








module.exports = {
  TheaterSignup,
  TheaterLogin,
  getTheater,
  getTheaterById,
  getTheaterbypagination,
  gettheaterbyCity,
  getallTheater
};
