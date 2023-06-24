const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const theaterSchema = new mongoose.Schema({
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
 
  profilephoto: {
    type: String,
    required: [true, "A product must have a image"],
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
});
theaterSchema.pre("save", async function (next) {
  const hashpassword = await bcrypt.hash(this.password, 10);
  this.password = hashpassword;
  next();
});

const Theater = mongoose.model("Theater", theaterSchema);
module.exports = Theater;
