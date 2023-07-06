const express = require("express");
const router = express.Router();
const FileUploadController = require("../controllers/FileUploadControllers");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "fileuploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/letterupload",
  upload.single("file"),
  FileUploadController.fileUpload
);

module.exports = router;
