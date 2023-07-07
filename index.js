const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const connection = require("./config/db");
const UserRoutes = require("./routes/UserRoutes");
const TaskRoutes = require("./routes/TaskRoutes");
const AttendenceRoutes = require("./routes/AttendenceRoutes");
const LeaveRoutes = require("./routes/LeaveRoutes");
const LateRoutes = require("./routes/LateRoutes");
const EarlyLogoutRoutes = require("./routes/EarlyLogoutRoutes");
const FileUploadRoutes = require("./routes/FileUploadRoutes");
const app = express();
app.use(cors());
PORT = process.env.PORT || 8000;

const path = require("path");

// Middlewares
app.use(bodyParser.json());

// Get Request
app.get("/", async (req, res) => {
  res.send("Connected to server");
});

// Routes
app.use("/", UserRoutes);
app.use("/", TaskRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", AttendenceRoutes);
app.use("/", LeaveRoutes);
app.use("/", LateRoutes);
app.use("/", EarlyLogoutRoutes);
app.use("/", FileUploadRoutes);

// Listening
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log(err);
  }
  console.log(`Listening on PORT ${PORT}`);
});
