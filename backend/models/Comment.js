const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  comment: {
    type: String,
    trim: [true, "Please Provide a comment without a space"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
commentSchema.pre("find", function (next) {
  this.populate({
    path: "user",
  });
  next();
});
const Comment = new mongoose.model("Comment", commentSchema);
module.exports = Comment;
