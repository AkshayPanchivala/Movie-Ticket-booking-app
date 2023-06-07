const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Theater = require("../models/Theater");

///admin signup
const TheaterSignup = asynchandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("jkjjf");
  const existingtheater = await Theater.findOne({ email: email });

  if (existingtheater) {
    return res.status(409).json({
      message: "Theater already exists",
    });
  }
  const theater = await Theater.create({
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    password: req.body.password,
    profilephoto: req.body.profilephoto,
    state: req.body.state,
    city: req.body.city,
    pincode: req.body.pincode,
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
  console.log(req.body.email);
  const existingtheater = await Theater.findOne({ email: email });

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

// const adminupdateprofile=asynchandler(async(req,res,next)=>{

// })
module.exports = { TheaterSignup, TheaterLogin, getTheater, getTheaterById };
