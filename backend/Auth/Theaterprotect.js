const jwt = require("jsonwebtoken");

const Theater = require("./../models/Theater");
const AppError = require("../arrorhandler/Apperror");

const Theaterprotect = async (req, res, next) => {
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

    const freshTheater = await Theater.findById(decoded.id);
    if (!freshTheater) {
      next(new AppError("you are not log in", 401));
    }
   
    req.theater = freshTheater;

    return next();
  } catch (err) {
    next(new AppError("you are not log in", 401));
  }
};
module.exports = Theaterprotect;
