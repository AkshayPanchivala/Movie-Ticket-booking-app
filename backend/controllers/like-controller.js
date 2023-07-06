const asyncHandler = require("express-async-handler");
const AppError = require("./../arrorhandler/Apperror");
const Like = require("./../models/Like");
const Movie = require("./../models/Movie");

///////////////////////////////////////////
/////create like////////////////////

const like = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
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

/////////////////get like by user////////
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

//////get avrage rating  Movie//////////////
const MostLiked = asyncHandler(async (req, res, next) => {
  const likedmovie = await Like.aggregate([
    {
      $group: {
        _id: "$movie",
        count: { $sum: 1 },
        totalRating: { $sum: "$rating" },
        avgRating: { $avg: "$rating" },
      },
    },
    {
      $sort: { avgRating: -1 },
    },
    {
      $limit: 8,
    },
  ]).exec();

  if (likedmovie.length == 0) {
    return next(new AppError("Not found any avrage rating  movie", 404));
  }

  const movie = [];
  for (let i = 0; i < likedmovie.length; i++) {
    const mostlikedmovie = await Movie.findById(likedmovie[i]._id).populate({
      path: "likescount",
    });

    const avg = likedmovie[i].avgRating;
    const movieObj = {
      ...mostlikedmovie.toObject(),
      likescount: likedmovie[i].count,
      rating: avg.toFixed(2),
    };

    movie.push(movieObj);
  }

  if (movie) {
    res.json({
      mostlikedmovie: movie,
    });
  } else {
    return next(new AppError("Movie is not found", 404));
  }
});

module.exports = { like, getlikebyuser, MostLiked };
