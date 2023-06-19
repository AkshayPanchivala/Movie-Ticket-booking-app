const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
    // theater: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Theater",
    // },
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
  count: true,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
