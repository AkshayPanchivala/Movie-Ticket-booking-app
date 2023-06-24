const asyncHandler = require("express-async-handler");
const AppError = require("./../arrorhandler/Apperror");
const Like = require("./../models/Like");
const Movie = require("./../models/Movie");

///////////////////////////////////////////
/////create like

const like = asyncHandler(async (req, res, next) => {
  const id = req.body.user;
  const movieid = req.body.movie.movieid;

  const movie = await Movie.findById(movieid);

  if (!movie) {
    return next(new AppError("movie is not found", 404));
  }

  const existinglike = await Like.findOne({
    user: id,
    movie: movieid,
  });

  if (existinglike) {
    return 1;
  }

  const like = await Like.create({
    user: id,
    movie: movieid,
    rating: req.body.rating,
  });
  res.status(200).json({
    status: "success",
    msg: "successfully liked this movie",
  });
});

const getlikebyuser = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const moid = req.params.movieid;

  const like = await Like.find({ user: id, movie: moid }).select(
    "-_id -user -movie"
  );
  if (!like) {
    res.status(200).json({
      msg: "successfully liked this movie",
    });
  }

  res.status(200).json({
    likes: like,
    status: "success",
    msg: "successfully liked this movie",
  });
});

// //////////////////////////////////////////////////
// ///get most liked Movie//////////////
const MostLiked = asyncHandler(async (req, res, next) => {
  const likedmovie = await Like.aggregate([
    {
      $group: {
        _id: "$movie",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 8,
    },
  ]).exec();

  if (likedmovie.length == 0) {
    return next(new AppError("Not found any like on bike", 404));
  }

  const movie = [];
  for (let i = 0; i < likedmovie.length; i++) {
    let rating = 0;
    const mostlikedmovie = await Movie.findById(likedmovie[i]).populate({
      path: "likescount",
    });

    mostlikedmovie.likescount.forEach((mov) => {
      rating += mov.rating;
    });

    const avg = rating / mostlikedmovie.likescount.length;
    const movieObj = {
      ...mostlikedmovie.toObject(),
      likescount: mostlikedmovie.likescount.length,
      rating: avg.toFixed(2),
    };

    movie.push(movieObj);
  }
  movie.sort((a, b) => b.rating - a.rating);

  if (movie) {
    res.json({
      mostlikedmovie: movie,
    });
  } else {
    return next(new AppError("Bike is not found", 404));
  }
});

module.exports = { like, getlikebyuser, MostLiked };
