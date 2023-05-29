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
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});
userSchema.pre("save", async function (next) {
  console.log("hashpassword");
  const hashpassword = await bcrypt.hash(this.password, 10);
  this.password = hashpassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
