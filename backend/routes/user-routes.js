const express = require("express");
const userRouter = express.Router();
const {
  getAllusers,
  signup,
  updateprofile,
  deleteprofile,
  login,
  getBookingsOfUser,
  getuserbyid,
  forgotpassword,
  resetpassword,
} = require("./../controllers/user-controller");

userRouter.route("/alluser").get(getAllusers);
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/forgotpassword").post(forgotpassword);
userRouter.route("/bookings/:id").get(getBookingsOfUser);

userRouter.route("/resetpassword/:token").patch(resetpassword);
userRouter
  .route("/:id")
  .get(getuserbyid)
  .put(updateprofile)
  .delete(deleteprofile);

module.exports = userRouter;
