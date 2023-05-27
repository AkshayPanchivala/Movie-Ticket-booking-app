const User = require("../models/User");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const getAllusers = asynchandler(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    user: user,
  });
});

const signup = asynchandler(async (req, res, next) => {
  const { name, email, password } = req.body;
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
  const user = await User.findByIdAndDelete(id);
  res.status(200).json({
    user: user,
    message: "Account is deleted",
  });
});
const login = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;
  const existinguser = await User.findOne({ email: email }).select("+password");
  console.log(existinguser);
  const verifypassword = await bcrypt.compare(
    req.body.password,
    existinguser.password
  );
  console.log(verifypassword);
  if (verifypassword) {
    return res.status(200).json({
      message: "Account is login",
    });
  } else {
    return res.status(404).json({
      message: "user  is not found",
    });
  }
});
module.exports = {
  getAllusers,
  signup,
  updateprofile,
  deleteprofile,
  login,
};
