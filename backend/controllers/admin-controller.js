const Admin = require("../models/Admin");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const adminSignin = asynchandler(async (req, res, next) => {
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
    return res.status(200).json({
      message: "Account is login",
    });
  } else {
    return res.status(404).json({
      message: "admin is not found",
    });
  }
});

module.exports = { adminSignin, adminLogin };
