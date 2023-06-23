const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto=require('crypto');
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
  profilephoto: {
    type: String,
    required: [true, "user profile picture"],
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  passwordchangeat: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  const hashpassword = await bcrypt.hash(this.password, 10);
  this.password = hashpassword;
  next();
});
userSchema.methods.createpaswordresettoken=function(){
  

  const resetToken=crypto.randomBytes(32).toString('hex');
  console.log(resetToken);

  this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires=Date.now()+10*60*1000;
  console.log(this.passwordResetExpires);

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
