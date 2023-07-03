const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,

    },
    description: {
      type: String,
      required: true,
    },
    language: [{ type: String, required: true }],
    posterUrl: {
      type: String,
      required: true,
    },
    category:{
      type:String,
      required:true,
    },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
movieSchema.virtual("likescount", {
  ref: "Like",
  localField: "_id",
  foreignField: "movie",
  // count: true,
});
movieSchema.virtual("comment", {
  ref: "Comment",
  localField: "_id",
  foreignField: "movie",
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
