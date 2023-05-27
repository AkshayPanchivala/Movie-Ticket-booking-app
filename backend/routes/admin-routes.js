const express = require("express");
const adminRouter = express.Router();
const { adminSignin,adminLogin } = require("./../controllers/admin-controller");

// adminRouter.route("/alluser").get(getAllusers);
adminRouter.route("/signin").post(adminSignin);
adminRouter.route("/login").post(adminLogin);
// adminRouter.route("/login").post(login);

// adminRouter.route("/:id").put(updateprofile).delete(deleteprofile);

module.exports = adminRouter;
