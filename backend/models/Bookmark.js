const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  movie: {
    type: String,
    required: true,
  },
  imdbmovieID: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
  
  },
});
const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
module.exports = Bookmark;
