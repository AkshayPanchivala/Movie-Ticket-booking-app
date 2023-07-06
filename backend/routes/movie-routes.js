const express = require("express");

// const { protect } = require("../Auth/Authcontroller");
const {
  addMovies,
  getMovies,
  getById,
  deleteMovie,
  updatemovie,
} = require("../controllers/movie-controller");
const {
  like,
  getlikebyuser,
  MostLiked,
} = require("../controllers/like-controller");
const{ Bookmarkcreate,getbookmarkbyuser} = require("../controllers/bookmark-controller");
const comment = require("./../controllers/comment-controller");

const movieRouter = express.Router();
const Userprotect = require("../Auth/Userprotect");
const Adminprotect = require("./../Auth/Adminprotect");
movieRouter.route("/").post(Adminprotect, addMovies).get(getMovies);
movieRouter.route("/like").post(Userprotect, like);
movieRouter.route("/MostLiked").get(MostLiked);
movieRouter.route("/getlike/:movieid").get(Userprotect, getlikebyuser);
movieRouter.route("/getbookmark").get(Userprotect,getbookmarkbyuser);
movieRouter.route("/delete/:id").delete(Adminprotect, deleteMovie);
movieRouter.route("/comment/:id").post(Userprotect, comment);
movieRouter.route("/bookmark").post(Userprotect,Bookmarkcreate);
movieRouter.route("/:id").get(getById).patch(updatemovie);

module.exports = movieRouter;
