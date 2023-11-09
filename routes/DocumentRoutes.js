const express = require("express");
const router = express.Router();
const DocumentController = require("../controllers/DocumentControllers");

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

router.post("/document", upload.array("files"), DocumentController.postDocument);
router.get("/document", DocumentController.getAllDocuments);

module.exports = router;
