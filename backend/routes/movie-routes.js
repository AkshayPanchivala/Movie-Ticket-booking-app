const express = require("express");

const { protect } = require("../Auth/Authcontroller");
const {
  addMovies,
  getMovies,
  getById,
} = require("../controllers/movie-controller");
const { uploadMoviePhoto } = require("../utill/moviemulter");
const movieRouter = express.Router();

movieRouter
  .route("/")
  .post(protect, uploadMoviePhoto, addMovies)
  .get(getMovies);
movieRouter.route("/:id").get(getById);

module.exports = movieRouter;
