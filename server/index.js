const express = require("express");
const app = express();
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/usre", userRoute);
app.use("/api/auth", authRoute);

app.listen(5001, () => {
  console.log("Backend server is running!");
});
