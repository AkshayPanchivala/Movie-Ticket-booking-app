const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const AppError = require("./../arrorhandler/Apperror");
const Booking = require("../models/Booking");
const sendEmail = require("../utill/email");

////////////////////////Get all user////////////////////////////
const getAllusers = asynchandler(async (req, res, next) => {
  const user = await User.find();
  if (!user) {
    return next(new AppError("No User found", 404));
  }
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

////////////////////////////////////////get user By Id////////////////////////////////
const getuserbyid = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  if (!req.params.id || req.params.id.length !== 24) {
    return next(new AppError(`Wrong id`, 400));
  }
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("No User found", 404));
  }
  res.status(200).json({
    user: user,
  });
});

/////////////////////////////////user update profile//////////////////////////////
const updateprofile = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  if (!req.params.id || req.params.id.length !== 24) {
    return next(new AppError(`Wrong id`, 400));
  }

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError(`User not found`, 404));
  }
  res.status(200).json({
    message: "Account is updated",
  });
});

/////////////////////////Delete profile////////////////////////////
const deleteprofile = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  if (!req.params.id || req.params.id.length !== 24) {
    return next(new AppError(`Wrong id`, 400));
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new AppError(`User not found`, 404));
  }
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

///////////////////////////user forgot password//////////////////////////////////
const forgotpassword = asynchandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  const resetToken = user.createpaswordresettoken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://localhost:3000/resetpassword/${resetToken}`;
  const message = `Forgot your password? submit a patch request with your new password and password confirm to: ${resetUrl}  . \n if you didn't forgot your password,please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "reset token",
      message,
    });
    res.status(200).json({
      email: user.email,
      subject: "Your Password reset token ",
      message,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
  }

});

/////////////////////////////////////user reset password/////////////////////////////////////////
const resetpassword = asynchandler(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has error"));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordchangeat = new Date();
  await user.save();

  res.status(200).json({
    status: "success",
  });
});













module.exports = {
  getAllusers,
  signup,
  updateprofile,
  deleteprofile,
  login,
  getBookingsOfUser,
  getuserbyid,
  resetpassword,
  forgotpassword,
};
