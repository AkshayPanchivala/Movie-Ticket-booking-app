const asynchandler = require("express-async-handler");

const AppError = require("../arrorhandler/Apperror");
const Booking = require("../models/Booking");
const Comment = require("../models/Comment");

const Like = require("../models/Like");

const Movie = require("../models/Movie");
const User = require("../models/User");

/////////////////////add Movies ////////////////////////////
const addMovies = asynchandler(async (req, res, next) => {
  const { description, language, admin, posterUrl, title } = req.body;

  let missingValues = [];
  if (!title || typeof title == "number") missingValues.push("Title  ");

  if (!description || typeof description == "number")
    missingValues.push("description ");
  if (!language || typeof language == "number") missingValues.push("Language ");
  if (!posterUrl || typeof posterUrl == "number")
    missingValues.push("PosterUrl ");

  if (missingValues.length > 0) {
    return next(
      new AppError(
        `required missing values : ${missingValues} is neccessary to be filled`,
        400
      )
    );
  }

  let existingmovie = await Movie.find({ title: req.body.title });

  if (existingmovie.length > 0) {
    return res.status(409).json({ message: "Already Added This Movie" });
  } else {
    let movie = await Movie.create({
      description: req.body.description,
      language: req.body.language,
      admin: req.body.admin,
      posterUrl: req.body.posterUrl,
      title: req.body.title,
    });

    return res.status(201).json({ message: "Movie added" });
  }
});

////////////////////////////Get All Movies ////////////////////////////
const getMovies = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  const page = req.query.page || 1;
  const limit = req.query.limit || 16;

  let movies;

  const totalMoviesCount = await Movie.countDocuments();
  const totalPages = Math.ceil(totalMoviesCount / limit);

  movies = await Movie.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate({
      path: "likescount",
    })
    .exec();

  if (!movies) {
    return res.status(500).json({ message: "Unexpected Error" });
  }

  const movieList = movies.map((movie) => {
    let totalrating = 0;
    if (movie.likescount.length > 0) {
      movie.likescount.map((ra) => {
        totalrating += ra.rating;
      });
      const likes = movie.likescount;
      const avgratings = (totalrating / movie.likescount.length).toFixed(2);

      return { ...movie._doc, rating: avgratings, likescount: likes.length };
    } else {
      return { ...movie._doc, rating: 0, likescount: 0 };
    }
  });

  return res.status(200).json({ movies: movieList, totalpages: totalPages });
});

/////////////////////Movie Get By Id /////////////////////////////
const getById = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  const ratings = [];
  const movie = await Movie.findById(id)
    .populate({
      path: "likescount",
    })
    .populate({
      path: "comment",
      options: {
        sort: { createdAt: -1 },
      },
    });

  movie.likescount.map((movie) => {
    ratings.push(movie.user);
  });

  if (!movie) {
    return res.status(404).json({
      message: "Invalid Movie ID",
    });
  }
  return res.status(200).json({ movie: movie, ratings: ratings });
});

////////////////Delete Movie//////////////
const deleteMovie = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  const today = new Date().toLocaleString();

  const bookingsavailable = await Booking.find({
    movie: id,
    date: { $gte: today },
  });
  if (bookingsavailable.length >0) {
    return res.status(400).json({
      message: "Movie not deleted",
    });
  }
  const Movieid = await Movie.findByIdAndDelete(id);

  const like = await Like.deleteMany({ movie: id });
  const comment = await Comment.deleteMany({ movie: id });
  const booking = await Booking.find({ movie: id });

  for (let i = 0; i < booking.length; i++) {
    const userid = booking[i].user;
    const movieid= booking[i].movie
    const user = await User.findByIdAndUpdate(
      userid,
      { $pull: { bookings: booking[i]._id } },
      { new: true }
    );
 
  }
  const bookings = await Booking.deleteMany({ movie: id });
  return res.status(200).json({
    message: "Movie deleted",
  });
});

module.exports = { addMovies, getMovies, getById, deleteMovie };
