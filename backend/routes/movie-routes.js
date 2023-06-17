const express = require("express");

const { protect } = require("../Auth/Authcontroller");
const {
  addMovies,
  getMovies,
  getById,
} = require("../controllers/movie-controller");
const {
  like,
  getlikebyuser,
  MostLiked,
} = require("../controllers/like-controller");

const movieRouter = express.Router();

movieRouter
  .route("/")
  // .post(protect, addMovies)
  .post(addMovies)
  .get(getMovies);
movieRouter.route("/like").post(like);
movieRouter.route("/MostLiked").get(MostLiked);
movieRouter.route("/getlike").post(getlikebyuser);
movieRouter.route("/:id").get(getById);

module.exports = movieRouter;
