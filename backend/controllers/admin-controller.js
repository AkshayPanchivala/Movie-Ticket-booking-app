const Admin = require("./../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupAdmin = async (req, res, next) => {
  const admin = await Admin.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  res.status(201).json({
    admin: admin,
    message: "successfully created account",
    token: token,
  });
};
const loginAdmin = async (req, res, next) => {
  console.log(req.body);
  const existingadmin = await Admin.findOne({ email: req.body.email });
  if (!existingadmin) {
    res.status(404).json({
      message: "Admin Not Found",
    });
  }
  console.log(existingadmin);
  if (existingadmin) {
    const verifypassword = await bcrypt.compare(
      req.body.password,
      existingadmin.password
    );
    console.log(verifypassword);
    if (!verifypassword) {
      return res.status(404).json({
        message: "Admin Email id or Password Wrong",
      });
    }
    const token = jwt.sign(
      { id: existingadmin._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );
    if (verifypassword) {
      return res.status(200).json({
        admin: existingadmin,
        message: "Admin loggin",
        token: token,
      });
    }
  }
};
module.exports = {
  signupAdmin,
  loginAdmin,
};
