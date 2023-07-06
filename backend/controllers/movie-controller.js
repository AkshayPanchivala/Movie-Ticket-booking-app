const asynchandler = require("express-async-handler");

const AppError = require("../arrorhandler/Apperror");
const Booking = require("../models/Booking");
const Bookmark = require("../models/Bookmark");
const Comment = require("../models/Comment");

const Like = require("../models/Like");

const Movie = require("../models/Movie");
const User = require("../models/User");
const sendEmail = require("../utill/email");

/////////////////////add Movies ////////////////////////////
const addMovies = asynchandler(async (req, res, next) => {
  const { description, language, admin, posterUrl, title, Category } = req.body;

  let missingValues = [];
  if (!title || typeof title == "number") missingValues.push("Title  ");

  if (!description || typeof description == "number")
    missingValues.push("description ");
  if (!language || typeof language == "number") missingValues.push("Language ");
  if (!posterUrl || typeof posterUrl == "number")
    missingValues.push("PosterUrl ");
  if (!Category || typeof Category == "number") missingValues.push("Category");
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
      category: req.body.Category,
    });
    let Interesteduser = await Bookmark.find({ movie: req.body.title });

    const message = `
I hope this email finds you well. I wanted to inform you that we have added a new movie to your favorites list. The details of the movie are as follows:

Movie Title: ${movie.title}


We thought you might be interested in this movie based on your previous interactions with our platform.
`;

    for (let i = 0; i < Interesteduser.length; i++) {
    await sendEmail({
        email: Interesteduser[i].email,
        subject: `your Favorites movie released Today `,
        message,
      });
    }
    return res.status(201).json({ message: "Movie added" });
  }
});

////////////////////////////Get All Movies ////////////////////////////
const getMovies = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  const page = req.query.page || 1;
  const limit = req.query.limit || 16;
  const language = req.query.language || {};
  const category = req.query.category || {};

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
  if (bookingsavailable.length > 0) {
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
    const movieid = booking[i].movie;
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

//////////////////////////////////////////////////movie update//////////////////

const updatemovie = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  if (!req.params.id || req.params.id.length !== 24) {
    return next(new AppError(`Wrong id`, 400));
  }

  const movie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!movie) {
    return next(new AppError(`Movie not found`, 404));
  }
  res.status(200).json({
    message: "Movie is updated",
  });
});

module.exports = { addMovies, getMovies, getById, deleteMovie, updatemovie };
