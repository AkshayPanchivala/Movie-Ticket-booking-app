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
    // console.log(token);
    // console.log("klkl" + process.env.JWT_SECRET_KEY);

    const decoded = jwt.verify(token, "MOVIETICKETBOOKING");
    console.log(decoded);
    const freshuser = await Theater.findById(decoded.id);
    if (!freshuser) {
      //   console.log("you are not log in");
      next(new AppError("you are not log in", 401));
    }
    console.log(freshuser);
    req.Theater = freshuser;
    console.log("lkllk");
    return next();
  } catch (err) {
    console.log(err);
    next(new AppError("you are not log in", 401));
  }
};
module.exports = { protect };
