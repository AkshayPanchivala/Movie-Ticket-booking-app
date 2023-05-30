const express = require("express");
const userRouter = express.Router();
const {
  getAllusers,
  signup,
  updateprofile,
  deleteprofile,
  login,
  getBookingsOfUser,
} = require("./../controllers/user-controller");

userRouter.route("/alluser").get(getAllusers);
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/bookings/:id").get(getBookingsOfUser);

userRouter.route("/:id").put(updateprofile).delete(deleteprofile);

module.exports = userRouter;
