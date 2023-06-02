const express = require("express");
const userRouter = express.Router();
const {
  getAllusers,
  signup,
  updateprofile,
  deleteprofile,
  login,
  getBookingsOfUser,
  getuserbyid
} = require("./../controllers/user-controller");
const { uploadUserPhoto } = require("../utill/usermulter");

userRouter.route("/alluser").get(getAllusers);
userRouter.route("/signup").post(uploadUserPhoto, signup);
userRouter.route("/login").post(login);
userRouter.route("/bookings/:id").get(getBookingsOfUser);

userRouter
  .route("/:id").get(getuserbyid)
  .put(uploadUserPhoto, updateprofile)
  .delete(deleteprofile);

module.exports = userRouter;
