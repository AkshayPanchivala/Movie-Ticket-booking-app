const asyncHandler = require("express-async-handler");
const AppError = require("./../arrorhandler/Apperror");
const Review = require("./../models/Review");
const Movie = require("./../models/Movie");


const review = asyncHandler(async (req, res, next) => {
    const id = req.body.user;
    const movieid = req.body.movie;
    const rating=req.body.rating;
    console.log(id);
  
    console.log(movieid);
    const existingreview = await Review.find({user:id, movie:movieid});
if(existingreview){
    
}
    console.log(movie);
    if (!movie) {
      return next(new AppError("movie is not found", 404));
    }
  
    const existinglike = await Like.findOne({
      user: id,
      movie: movieid,
    });
    console.log(existinglike);
    if (existinglike) {
      const deletedislike = await Like.findOneAndDelete({
        user: id,
        movie: movieid,
      });
      return res.status(200).json({
        status: "success",
        msg: "successfully dislike this movie",
      });
    }
  
    const like = await Like.create({
      user: id,
      movie: movieid,
    });
    res.status(200).json({
      status: "success",
      msg: "successfully liked this movie",
    });
  });