const asynchandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const AppError = require("../arrorhandler/Apperror");

const Theater = require("../models/Theater");
const Movie = require("../models/Movie");

const addMovies = asynchandler(async (req, res, next) => {
  const { title, description, releaseDate, featured, actors } = req.body;
  console.log(req.body);
  console.log("KLKL");
  let missingValues = [];

  if (!title || typeof title == "String") missingValues.push("Name ");

  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required missing values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }
  let movie = new Movie({
    description,
    releaseDate: new Date(`${releaseDate}`),
    featured,
    actors,
    theater: req.body._id,
    posterUrl: req.file.filename,
    title,
  });
  const session = await mongoose.startSession();
  const adminUser = req.admin;
  session.startTransaction();
  await movie.save({ session });
  console.log(adminUser);
  adminUser.adedMovies.push(movie);
  await adminUser.save({ session });
  await session.commitTransaction();
  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ movie });
});
const getMovies = asynchandler(async (req, res, next) => {
  const movies = await Movie.find();
  res.json({
    movies: movies,
  });
});
const getById = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).json({
      message: "Invalid Movie ID",
    });
  }
  return res.status(200).json({ movie: movie });
});
module.exports = { addMovies, getMovies, getById };
