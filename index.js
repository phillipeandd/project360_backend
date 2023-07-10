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
const app = express();
app.use(cors());
PORT = process.env.PORT || 8000;

const path = require("path");

// const multer = require('multer');
// const path = require('path');
// const app = express();
// const upload = multer({ dest: 'upload/' });


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
app.use("/", ProbationLetterRoutes);
app.use("/", OfferLetterRoutes);





// // Create folder route
// app.post('/api/folders', (req, res) => {
//   const { folderName } = req.body;
//   const collection = db.collection('folders');
  
//   collection.insertOne({ name: folderName }, (err, result) => {
//     if (err) {
//       console.error('Error creating folder:', err);
//       res.status(500).send('Error creating folder');
//       return;
//     }
//     res.status(200).send('Folder created successfully');
//   });
// });

// // Upload file route
// app.post('/api/upload', upload.single('file'), (req, res) => {
//   const { file } = req;
//   const collection = db.collection('files');
  
//   collection.insertOne({ name: file.originalname, path: file.path }, (err, result) => {
//     if (err) {
//       console.error('Error uploading file:', err);
//       res.status(500).send('Error uploading file');
//       return;
//     }
//     res.status(200).send('File uploaded successfully');
//   });
// });

// // Move file route
// app.post('/api/move-file', (req, res) => {
//   const { fileId, destinationFolder } = req.body;
//   const filesCollection = db.collection('files');
//   const foldersCollection = db.collection('folders');

//   foldersCollection.findOne({ name: destinationFolder }, (err, folder) => {
//     if (err) {
//       console.error('Error finding destination folder:', err);
//       res.status(500).send('Error moving file');
//       return;
//     }
    
//     if (!folder) {
//       res.status(404).send('Destination folder not found');
//       return;
//     }

//     filesCollection.findOneAndUpdate(
//       { _id: fileId },
//       { $set: { folderId: folder._id } },
//       (err, result) => {
//         if (err) {
//           console.error('Error moving file:', err);
//           res.status(500).send('Error moving file');
//           return;
//         }
//         res.status(200).send('File moved successfully');
//       }
//     );
//   });
// });


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
