const asynchandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const AppError = require("../arrorhandler/Apperror");

const Theater = require("../models/Theater");
const Movie = require("../models/Movie");

const addMovies = asynchandler(async (req, res, next) => {
  const { title, description, releaseDate, featured, actors } = req.body;
  console.log(req.body);
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

  let movie = await Movie.create({
    description: req.body.description,
    language: req.body.language,
    admin: req.body.admin,
    posterUrl: req.body.posterUrl,
    title: req.body.title,
  });

  // const session = await mongoose.startSession();
  // const adminUser = req.admin;
  // session.startTransaction();
  // await movie.save({ session });

  // adminUser.adedMovies.push(movie);
  // await adminUser.save({ session });

  // await session.commitTransaction();
  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ movie });
});
const getMovies = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  let movies;

  const totalMoviesCount = await Movie.countDocuments();
  console.log(totalMoviesCount);
  const totalPages = Math.ceil(totalMoviesCount / limit);

  movies = await Movie.find()
    // .sort({ date: 1 })
    .skip((page - 1) * limit)
    .limit(limit)

    .exec();

  if (!movies) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ movies: movies, totalpages: totalPages });
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
