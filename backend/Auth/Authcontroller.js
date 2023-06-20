const jwt = require("jsonwebtoken");

const Theater = require("./../models/Theater");
const AppError = require("../arrorhandler/Apperror");

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    );
    {
      token = req.headers.authorization.split(" ")[1];
    }


    const decoded = jwt.verify(token, "MOVIETICKETBOOKING");
    console.log(decoded);
    const freshuser = await Theater.findById(decoded.id);
    if (!freshuser) {

      next(new AppError("you are not log in", 401));
    }

    req.admin = freshuser;

    return next();
  } catch (err) {

    next(new AppError("you are not log in", 401));
  }
};
module.exports = { protect };
