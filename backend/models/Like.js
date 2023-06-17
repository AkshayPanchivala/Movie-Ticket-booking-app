const mongoose = require("mongoose");

const likeschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
});

const Like = mongoose.model("Like", likeschema);
module.exports = Like;
