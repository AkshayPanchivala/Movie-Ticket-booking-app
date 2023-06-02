const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  profilephoto: { type: String,
    required: [true, "A product must have a image"]},
    // city:{
    //   type:String,
    //   required:true,

    // },state:{
    //   type:String,
    //   required:true,

    // }
});

userSchema.pre("save", async function (next) {
  const hashpassword = await bcrypt.hash(this.password, 10);
  this.password = hashpassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
