const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },phonenumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  adedMovies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    },
  ],
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
    pincode:{
      type:Number,
      required:true
    }
});
adminSchema.pre("save", async function (next) {
  const hashpassword = await bcrypt.hash(this.password, 10);
  this.password = hashpassword;
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
