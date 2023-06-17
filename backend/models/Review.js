const mongoose = require("mongoose");

const riviewschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  }, 
  rating: {
    type: Number,
    required,
  },
});

const Review = mongoose.model("Review", riviewschema);
module.exports = Review;
