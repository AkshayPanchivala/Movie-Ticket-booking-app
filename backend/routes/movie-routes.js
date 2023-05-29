const express = require("express");

const { protect } = require("../Auth/Authcontroller");
const { addMovies,getMovies,getById } = require("../controllers/moovie-controller");

const movieRouter = express.Router();

movieRouter.route("/").post(protect, addMovies).get(getMovies);
movieRouter.route("/:id").get(getById)

module.exports = movieRouter;
