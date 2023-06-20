const jwt = require("jsonwebtoken");

const Admin = require("./../models/Admin");
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

    const freshadmin = await Admin.findById(decoded.id);
    if (!freshadmin) {
      //   console.log("you are not log in");
      next(new AppError("you are not log in", 401));
    }
 
    req.admin = freshadmin;
  
    return next();
  } catch (err) {

    next(new AppError("you are not log in", 401));
  }
};
module.exports = { protect };
