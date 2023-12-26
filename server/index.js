const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http");
const { initSocketServer } = require("./socket");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const server = http.createServer(app);
app.use(bodyParser.json());

app.use(cors());
// QUEUING and MESSAGING SOCKET
initSocketServer(server);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
