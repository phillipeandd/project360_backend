const express = require("express");
const router = express.Router();
const FileUploadController = require("../controllers/FileUploadControllers");

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

router.post(
  "/letterupload",
  upload.single("file"),
  FileUploadController.fileUpload
);
router.get("/download/:fileName", FileUploadController.fileDownload);

module.exports = router;
