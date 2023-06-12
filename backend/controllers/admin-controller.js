const Admin = require("./../models/Admin");
const bcrypt = require("bcryptjs");
const signupAdmin = async (req, res, next) => {
  const admin = await Admin.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(201).json({
    admin: admin,
    message: "successfully created account",
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
  if (existingadmin) {
    const verifypassword = bcrypt.compare(
      req.body.password,
      existingadmin.password
    );
    if (!verifypassword) {
      return res.status(404).json({
        message: "Admin Email id or Password Wrong",
      });
    }
    if (verifypassword) {
      return res.status(200).json({
        admin: existingadmin,
        message: "Admin loggin",
      });
    }
  }
};
module.exports = {
  signupAdmin,
  loginAdmin,
};
