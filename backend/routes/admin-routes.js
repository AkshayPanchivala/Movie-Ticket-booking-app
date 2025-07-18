const express = require("express");
const { signupAdmin, loginAdmin } = require("../controllers/admin-controller");

const AdminRouter = express.Router();

// BookingRouter.route("/").post(newBooking);

AdminRouter.route("/signup").post(signupAdmin);
AdminRouter.route("/login").post(loginAdmin);


module.exports = AdminRouter;
