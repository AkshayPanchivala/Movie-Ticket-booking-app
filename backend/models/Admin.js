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
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
 
});

adminSchema.pre("save", async function (next) {
  const hashpassword = await bcrypt.hash(this.password, 10);
  this.password = hashpassword;
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
