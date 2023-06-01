const express = require("express");
const adminRouter = express.Router();
const {
  adminSignup,
  adminLogin,
  getAdmins,
  getadminById,
} = require("./../controllers/admin-controller");

// adminRouter.route("/alluser").get(getAllusers);
adminRouter.route("/signup").post(adminSignup);
adminRouter.route("/login").post(adminLogin);
adminRouter.route("/").get(getAdmins);
adminRouter.route("/:id").get(getadminById);
// adminRouter.route("/login").post(login);

// adminRouter.route("/:id").put(updateprofile).delete(deleteprofile);

module.exports = adminRouter;
