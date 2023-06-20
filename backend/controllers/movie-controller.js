const asynchandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const AppError = require("../arrorhandler/Apperror");

const Theater = require("../models/Theater");
const Movie = require("../models/Movie");

const addMovies = asynchandler(async (req, res, next) => {
  // const { description, language, admin, posterUrl, title } = req.body;

  // let missingValues = [];

  // if (!description|| typeof description == "number") missingValues.push("description ");
  // if (!email || typeof email == "number") missingValues.push("Email ");
  // if (!password) missingValues.push("password ");

  // if (missingValues.length > 0) {
  //   return next(
  //     new AppError(
  //       `required missing values : ${missingValues} is neccessary to be filled`,
  //       400
  //     )
  //   );
  // }
  let existingmovie = await Movie.find({ title: req.body.title });
  console.log(req.body);
  if (existingmovie.length > 0) {
    return res.status(409).json({ message: "Already Aded This Movie" });
  } else {
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
      return res.status(400).json({ message: "Something went wrong" });
    }

    return res.status(201).json({ movie });
  }
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
// });
const getById = asynchandler(async (req, res, next) => {
  const id = req.params.id;
  console.log("klkl");
  const ratings = [];
  const movie = await Movie.findById(id)
    .populate({
      path: "likescount",
    })
    .populate({
      path: "comment",
      options: {
        sort: { createdAt: -1 }, // Sort comments by createdAt field in descending order
      },
    });

  movie.likescount.map((movie) => {
    ratings.push(movie.user);
  });
  console.log(movie);
  if (!movie) {
    return res.status(404).json({
      message: "Invalid Movie ID",
    });
  }
  return res.status(200).json({ movie: movie, ratings: ratings });
});
module.exports = { addMovies, getMovies, getById };
