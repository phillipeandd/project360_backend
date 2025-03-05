// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const bodyParser = require("body-parser");
// const connection = require("./config/db");
// const path = require("path");

// // Import Routes
// const UserRoutes = require("./routes/UserRoutes");
// const TaskRoutes = require("./routes/TaskRoutes");
// const AttendenceRoutes = require("./routes/AttendenceRoutes");
// const LeaveRoutes = require("./routes/LeaveRoutes");
// const LateRoutes = require("./routes/LateRoutes");
// const EarlyLogoutRoutes = require("./routes/EarlyLogoutRoutes");
// const ProbationLetterRoutes = require("./routes/ProbationLetterRoutes");
// const OfferLetterRoutes = require("./routes/OfferLetterRoutes");
// const MessageRoutes = require("./routes/MessageRoutes");
// const ChatRoutes = require("./routes/ChatRoutes");
// const EventRoutes = require("./routes/EventRoutes");
// const DocumentRoutes = require("./routes/DocumentRoutes");
// const ReminderRoutes = require("./routes/ReminderRoutes");
// const ListRoutes = require("./routes/ListRoutes");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 8000;

// // Create HTTP Server & Socket.IO
// const http = require("http");
// const socketIO = require("socket.io");
// const httpServer = http.createServer(app);
// const io = socketIO(httpServer, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// // Serve Static Files (Uploads)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Default Route
// app.get("/", (req, res) => {
//   res.send("Connected to server");
// });

// // Routes
// app.use("/", UserRoutes);
// app.use("/", TaskRoutes);
// app.use("/", AttendenceRoutes);
// app.use("/", LeaveRoutes);
// app.use("/", LateRoutes);
// app.use("/", EarlyLogoutRoutes);
// app.use("/", ProbationLetterRoutes);
// app.use("/", OfferLetterRoutes);
// app.use("/", MessageRoutes);
// app.use("/", ChatRoutes);
// app.use("/", EventRoutes);
// app.use("/", DocumentRoutes);
// app.use("/", ReminderRoutes);
// app.use("/", ListRoutes);

// // 🔹 *Socket.IO Configuration*
// io.on("connection", (socket) => {
//   console.log(`✅ User connected: ${socket.id}`);

//   // Receive a message and broadcast it
//   socket.on("newMessage", (message) => {
//     console.log(`📩 Message Received:`, message);
//     io.emit("newMessage", message); // Send to all clients
//   });

//   // Custom event (if needed)
//   socket.on("customEvent", (data) => {
//     console.log(`🛠 Custom Event:`, data);
//   });

//   // Handle Disconnection
//   socket.on("disconnect", () => {
//     console.log(`❌ User disconnected: ${socket.id}`);
//   });
// });

// // 🔹 *Start Server*
// httpServer.listen(PORT, async () => {
//   try {
//     await connection;
//     console.log("🚀 MongoDB Connected Successfully");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err);
//   }
//   console.log(`🎯 Server running on PORT ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const connection = require("./config/db");
const path = require("path");

// Import Routes
const UserRoutes = require("./routes/UserRoutes");
const TaskRoutes = require("./routes/TaskRoutes");
const AttendenceRoutes = require("./routes/AttendenceRoutes");
const LeaveRoutes = require("./routes/LeaveRoutes");
const LateRoutes = require("./routes/LateRoutes");
const EarlyLogoutRoutes = require("./routes/EarlyLogoutRoutes");
const ProbationLetterRoutes = require("./routes/ProbationLetterRoutes");
const OfferLetterRoutes = require("./routes/OfferLetterRoutes");
const MessageRoutes = require("./routes/MessageRoutes");
const ChatRoutes = require("./routes/ChatRoutes");
const EventRoutes = require("./routes/EventRoutes");
const DocumentRoutes = require("./routes/DocumentRoutes");
const ReminderRoutes = require("./routes/ReminderRoutes");
const ListRoutes = require("./routes/ListRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

// Create HTTP Server & Socket.IO
const http = require("http");
const socketIO = require("socket.io");
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware to attach `io` to requests for WebSocket-enabled routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve Static Files (Uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Default Route
app.get("/", (req, res) => {
  res.send("Connected to server");
});

// Routes
app.use("/", UserRoutes);
app.use("/", TaskRoutes);
app.use("/", AttendenceRoutes);
app.use("/", LeaveRoutes);
app.use("/", LateRoutes);
app.use("/", EarlyLogoutRoutes);
app.use("/", ProbationLetterRoutes);
app.use("/", OfferLetterRoutes);
app.use("/", MessageRoutes);
app.use("/", ChatRoutes); // ChatRoutes now has `req.io`
app.use("/", EventRoutes);
app.use("/", DocumentRoutes);
app.use("/", ReminderRoutes);
app.use("/", ListRoutes);

// 🔹 *Socket.IO Configuration*
io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

// Join a private chat room (for direct messaging)
socket.on("joinRoom", (userId) => {
  socket.join(userId);
  console.log(`👥 User joined room: ${userId}`);
});

// Join a group chat room
socket.on("joinGroup", (groupId) => {
  socket.join(groupId);
  console.log(`👥 User joined group: ${groupId}`);
});

// Handle Sending Group Messages
socket.on("sendGroupMessage", ({ sender, groupId, message }) => {
  console.log(`📩 Group Message from ${sender} in ${groupId}:`, message);

  if (!groupId) return console.error("⚠️ Group ID is missing");

  // Emit message to all members in the group
  io.to(groupId).emit("newGroupMessage", { sender, message });
});


  // Receive and Broadcast Messages
  socket.on("sendMessage", ({ sender, receiver, message }) => {
    console.log(`📩 Message Received from ${sender} to ${receiver}:`, message);
    if (!receiver) return console.error("⚠️ Receiver ID is missing");
    // Broadcast message only to the intended receiver
    io.to(receiver).emit("newMessage", { sender, message });
  });

  // Handle Disconnection
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// 🔹 *Start Server After Connecting to MongoDB*
connection
  .then(() => {
    console.log("🚀 MongoDB Connected Successfully");
    httpServer.listen(PORT, () => {
      console.log(`🎯 Server running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
