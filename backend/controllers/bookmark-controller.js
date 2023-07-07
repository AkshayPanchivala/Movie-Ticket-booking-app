const asyncHandler = require("express-async-handler");
const Bookmark = require("../models/Bookmark");
const AppError = require("./../arrorhandler/Apperror");
////////////////////create a bookmark///////////////////////
const Bookmarkcreate = asyncHandler(async (req, res, next) => {
  const { movie, imdbmovieID, user } = req.body;
  let missingValues = [];

  if (!movie || typeof movie == "number") missingValues.push("movie ");

  if (!imdbmovieID) missingValues.push("imdbmovieID");
  if (!user || typeof user == "number") missingValues.push("User");

  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required  values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }

  const bookmark = await Bookmark.create({
    movie: req.body.movie,
    imdbmovieID: req.body.imdbmovieID,
    user: req.body.user,
    email: req.user.email
  });

  res.status(201).json({
    bookmark: bookmark,
    message: "Bookmark successfully Added",
  });
});
//////////////////get a bookmark by a user//////////////////////
const getbookmarkbyuser = asyncHandler(async (req, res, next) => {
  const id = req.user._id;

  const bookmark = await Bookmark.find({ user: id }).select(
    "-_id -user -movie"
  );
  
  if (!bookmark) {
    res.status(200).json({
      msg: "successfully liked this movie",
    });
  }
  const bokmarkidarray = [];
  for (let i = 0; i < bookmark.length; i++) {
    bokmarkidarray.push(+bookmark[i].imdbmovieID);
  }
  res.status(200).json({
    bookmarks:bokmarkidarray,
    status: "success",
    msg: "successfully liked this movie",
  });
});
module.exports = { Bookmarkcreate, getbookmarkbyuser };
