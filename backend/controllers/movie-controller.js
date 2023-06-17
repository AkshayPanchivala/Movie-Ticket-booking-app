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
// const getMovies = asynchandler(async (req, res, next) => {
//   const id = req.params.id;

//   const page = req.query.page || 1;
//   const limit = req.query.limit || 16;

//   let movies;

//   const totalMoviesCount = await Movie.countDocuments();
//   console.log(totalMoviesCount);
//   console.log(totalMoviesCount);
//   const totalPages = Math.ceil(totalMoviesCount / limit);

//   movies = await Movie.find()
//     // .sort({ date: 1 })
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .populate({
//       path: "likescount",
//     })
//     .exec();
//   console.log("movies" + movies);
//   let ratings=[]
// for(let i=0;i<movies.length;i++){
//   const a=movies[i].likescount
//   const likes = a;
//   const maxRating = 5;
//   const maxLikes = 100;

//   const rating = (likes / maxLikes) * maxRating;

//   const rate=(rating.toFixed(2)/maxRating);
//   ratings.push(rate)
// }

//   if (!movies) {
//     return res.status(500).json({ message: "Unexpected Error" });
//   }
//   return res.status(200).json({ movies: movies,rating:ratings, totalpages: totalPages });

const getMovies = asynchandler(async (req, res, next) => {
  console.log("dsf");
  const id = req.params.id;

  const page = req.query.page || 1;
  const limit = req.query.limit || 16;

  let movies;

  const totalMoviesCount = await Movie.countDocuments();
  const totalPages = Math.ceil(totalMoviesCount / limit);

  movies = await Movie.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .populate({
      path: "likescount",
    })
    .exec();

  if (!movies) {
    return res.status(500).json({ message: "Unexpected Error" });
  }

  const maxRating = 5;
  const maxLikes = 100;

  const movieList = movies.map((movie) => {
    const likes = movie.likescount;
    const ratings = ((likes / maxLikes) * maxRating).toFixed(2);
    // console.log("cxcx" + rating);
    // const rate = (rating.toFixed(2) / maxRating).toFixed(2);
    // console.log("cxxzccx" + rate);
    return { ...movie._doc, rating: ratings, likescount: likes };
  });

  return res.status(200).json({ movies: movieList, totalpages: totalPages });
});
// });
const getById = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  const movie = await Movie.findById(id).populate({
    path: "likescount",
  });
  if (!movie) {
    return res.status(404).json({
      message: "Invalid Movie ID",
    });
  }
  return res.status(200).json({ movie: movie });
});
module.exports = { addMovies, getMovies, getById };
