const express = require("express")
const router = express.Router()
const TaskController = require("../controllers/TaskControllers")

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post("/admintask", upload.single('file'), TaskController.assignTask)
router.get("/seeAllTask", TaskController.seeAllTask)
router.delete("/deleteTask/:id", TaskController.deleteTask)
router.patch("/editTask/:id", TaskController.editTask)

module.exports = router