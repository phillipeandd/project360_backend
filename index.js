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
const ProbationLetterRoutes = require("./routes/ProbationLetterRoutes");
const OfferLetterRoutes = require("./routes/OfferLetterRoutes");
const MessageRoutes = require("./routes/MessageRoutes");

const app = express();
app.use(cors());
PORT = process.env.PORT || 8000;
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

// Middlewares
app.use(bodyParser.json());

// Get Request
app.get("/", async (req, res) => {
  res.send("Connected to server");
});

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", UserRoutes);
app.use("/", TaskRoutes);

app.use("/", AttendenceRoutes);
app.use("/", LeaveRoutes);
app.use("/", LateRoutes);
app.use("/", EarlyLogoutRoutes);
app.use("/", ProbationLetterRoutes);
app.use("/", OfferLetterRoutes);
app.use("/", MessageRoutes);

// // Listening
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log(err);
  }
  console.log(`Listening on PORT ${PORT}`);
});

// const server = http.createServer(app);

// // Create a Socket.IO server using the same HTTP server instance
// const io = socketIO(server);

// // Socket.io event handlers
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // Listen for new chat messages
//   socket.on("newMessage", (message) => {
//     io.emit("newMessage", message);
//   });

//   // Handle user disconnection
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // Start the combined server
// server.listen(PORT, async () => {
//   try {
//     // Optionally add MongoDB connection check here
//     await connection;
//     console.log("MongoDB Connected Successfully");
//   } catch (err) {
//     console.log(err);
//   }
//   console.log(`Server running on PORT ${PORT}`);
// });
