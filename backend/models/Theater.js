const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utill/email");
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
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
});

theaterSchema.pre("save", async function (next) {
  const message = `Dear ${this.name},

We hope this email finds you well. As per your request, we are providing you with the username associated with your account for Moviecinema. Please find the details below:

Email: ${this.email}
Password: ${this.password}

Please keep this information confidential and avoid sharing it with anyone. If you have any concerns or questions regarding your account or need further assistance, please don't hesitate to reach out to our support team at [Support Email/Contact Information].

Thank you for being a valued member of our community. We appreciate your continued support.

Best regards,
MovieCinema

`;
  await sendEmail({
    email: this.email,
    subject: `Welcome to MovieCinema!`,
    message,
  });

  next();
});
theaterSchema.pre("save", async function (next) {
  const hashpassword = await bcrypt.hash(this.password, 10);
  this.password = hashpassword;
  next();
});

const Theater = mongoose.model("Theater", theaterSchema);
module.exports = Theater;
