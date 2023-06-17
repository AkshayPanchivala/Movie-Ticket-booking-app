const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Theater = require("../models/Theater");
const User = require("../models/User");

const TheaterSignup = asynchandler(async (req, res, next) => {


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
    message: "Account is created",
  });
});

const TheaterLogin = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingtheater = await Theater.findOne({ email: email });

  const verifypassword = await bcrypt.compare(
    req.body.password,
    existingtheater.password
  );
  // const verifypassword = true;

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
      message: "Account is login",
    });
  } else {
    return res.status(404).json({
      message: "Theater is not found",
    });
  }
});

const getTheater = asynchandler(async (req, res, next) => {
  let admins;

  admins = await Theater.find();
  if (!admins) {
    return res.status(404).json({ message: "Not found data" });
  }
  return res.status(200).json({ data: admins });
});

const getTheaterbypagination = asynchandler(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 4;

  console.log(req.body.id);
  const user = await User.findOne({ _id: req.body.id });
  console.log(user.pincode);

  const totalBookingsCount = await Theater.countDocuments({
    pincode: user.pincode,
  });

  const totalPages = Math.ceil(totalBookingsCount / limit);

  const theater = await Theater.find({ pincode: user.pincode })
    .skip((page - 1) * limit)
    .limit(limit);
  res.status(200).json({ theater: theater, totalPages: totalPages });
});

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
const gettheaterbyCity = asynchandler(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 4;

  console.log(req.body.city);

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
};
