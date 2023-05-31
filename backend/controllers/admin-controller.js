const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

///admin signup
const adminSignup = asynchandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const existingadmin = await Admin.findOne({ email: email });

  if (existingadmin) {
    return res.status(400).json({
      message: "admin already exists",
    });
  }
  const admin = await Admin.create(req.body);

  res.status(201).json({
    admin: admin,
    message: "Account is created",
  });
});

const adminLogin = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;
  const existingadmin = await Admin.findOne({ email: email });

  const verifypassword = await bcrypt.compare(
    req.body.password,
    existingadmin.password
  );
  console.log(verifypassword);
  if (verifypassword) {
    const token = jwt.sign(
      { id: existingadmin._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    return res.status(200).json({
      admin: existingadmin,
      token: token,
      message: "Account is login",
    });
  } else {
    return res.status(404).json({
      message: "admin is not found",
    });
  }
});

const getAdmins = asynchandler(async (req, res, next) => {
  let admins;

  admins = await Admin.find();
  if (!admins) {
    return res.status(404).json({ message: "Not found data" });
  }
  return res.status(200).json({ data: admins });
});

module.exports = { adminSignup, adminLogin, getAdmins };
