require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/user-routes");
const adminRouter = require("./routes/admin-routes");
const db = require("./utill/connection");
const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
db();
app.listen(process.env.PORT, () => {
  console.log(`app listening on ${process.env.PORT}`);
});
