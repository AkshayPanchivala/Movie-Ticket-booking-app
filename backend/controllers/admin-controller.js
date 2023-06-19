const Admin = require("./../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");

const signupAdmin = asynchandler(async (req, res, next) => {
  const { name, email, password} = req.body;

  let missingValues = [];

  if (!name || typeof(name)=='number') missingValues.push("Name ");
  if (!email || typeof(email)=='number') missingValues.push("Email ");
  if (!password) missingValues.push("password ");
 

  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required missing values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }
 









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
});
const loginAdmin = asynchandler(async (req, res, next) => {
  const {email, password} = req.body;

  let missingValues = [];

  
  if (!email || typeof(email)=='number') missingValues.push("Email ");
  if (!password) missingValues.push("password ");
 

  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required missing values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }
  const existingadmin = await Admin.findOne({ email: req.body.email });
  if (!existingadmin) {
    res.status(404).json({
      message: "Admin Not Found",
    });
  }

  if (existingadmin) {
    const verifypassword = await bcrypt.compare(
      req.body.password,
      existingadmin.password
    );

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
});
module.exports = {
  signupAdmin,
  loginAdmin,
};
