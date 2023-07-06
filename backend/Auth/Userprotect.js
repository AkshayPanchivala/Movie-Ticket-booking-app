const jwt = require("jsonwebtoken");

const User = require("./../models/User");
const AppError = require("../arrorhandler/Apperror");

const Userprotect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    const decoded = jwt.verify(token, "MOVIETICKETBOOKING");

    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      next(new AppError("you are not log in", 401));
    }

    req.user = freshUser;
    
    next();
  } catch (err) {
    next(new AppError("you are not log in", 401));
  }
};
module.exports = Userprotect;
