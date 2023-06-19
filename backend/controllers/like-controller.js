const asyncHandler = require("express-async-handler");
const AppError = require("./../arrorhandler/Apperror");
const Like = require("./../models/Like");
const Movie = require("./../models/Movie");
// const DisLike = require("./../models/dislike.model");

// const Comments = require("../module/comment.model");

///////////////////////////////////////////
/////create like

const like = asyncHandler(async (req, res, next) => {
  const id = req.body.user;
  const movieid = req.body.movie;
  

  const movie = await Movie.findById(movieid);

  if (!movie) {
    return next(new AppError("movie is not found", 404));
  }

  const existinglike = await Like.findOne({
    user: id,
    movie: movieid,
  });

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

const getlikebyuser = asyncHandler(async (req, res, next) => {
  const id = req.body.user;
  console.log(id);
  const like = await Like.find({ user: id }).select("-_id -user");

  console.log("like" + like);
  res.status(200).json({
    likes: like,
    status: "success",
    msg: "successfully liked this movie",
  });
});
//////////////////////////////////////////////////////
////create dislike
// const dislike=asyncHandler(async(req,res,next)=>{

//         const id=req.params.id;
//         const bike=await Bike.findById(id);

//         if(!bike){
//             return next(new AppError("Bike is not found",404));
//         }

//        const existingdislike=await DisLike.findOne({
//         user_id: req.user.id,
//         Bike_id: id,
//        })
//        if(existingdislike){
//         return next(new AppError("you Have already dislike this product",400));
//        }
//        const deletelike=await Like.findOneAndDelete({

//         user_id: req.user.id,
//         Bike_id: id,
//        })
//        const dislike=await DisLike.create({
//         user_id: req.user.id,
//         Bike_id: id,
//        })

//        res.status(400).json({
//         status:'success',
//         msg:"successfully disliked this bike"
//        })

// });

// //////////////////////////////////////////////////
// ///get most liked product
const MostLiked = asyncHandler(async (req, res, next) => {
  const likedmovie = await Like.aggregate([
    {
      $group: {
        _id: "$movie",
        count: { $sum: 1 }, // counting no. of documents pass
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

  //   const bike=likedbike[0]
  const movie = [];
  for (let i = 0; i < likedmovie.length; i++) {
    const mostlikedmovie = await Movie.findById(likedmovie[i]).populate({
      path: "likescount",
    });
    movie.push(mostlikedmovie);
  }

  if (movie) {
    res.json({
      mostlikedmovie: movie,
    });
  } else {
    return next(new AppError("Bike is not found", 404));
  }
});

module.exports = { like, getlikebyuser, MostLiked };
