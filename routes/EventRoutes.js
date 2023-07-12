const express = require("express");
const router = express.Router();
const EventController = require("../controllers/EventControllers");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/event", upload.array("files"), EventController.postEvent);
router.get("/event", EventController.getAllEvents);

module.exports = router;
