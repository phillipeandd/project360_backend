// const express = require("express")
// const router = express.Router()
// const TaskController = require("../controllers/TaskControllers")

// const multer = require('multer');

// // const upload = multer({ dest: 'uploads/' });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
  
//   const upload = multer({ storage });

// router.post("/admintask", upload.single('file'), TaskController.assignTask)
// router.post("/admintasktest", upload.array("files", 5), TaskController.assignTaskTest)
// router.get("/seeAllTask", TaskController.seeAllTask)
// router.delete("/deleteTask/:id", TaskController.deleteTask)
// router.patch("/editTask/:id", TaskController.editTask)

// module.exports = router

const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskControllers");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/admintask", upload.single('file'), TaskController.assignTask);
router.post("/admintasktest", upload.array("files", 4), TaskController.assignTaskTest); 
router.post("/postmultiple", upload.array("files",10), TaskController.postMultipleEmployeeTask);
router.get("/seeAllTask", TaskController.seeAllTask)
router.delete("/deleteTask/:id", TaskController.deleteTask);
router.patch("/editTask/:id", TaskController.editTask);

module.exports = router;
