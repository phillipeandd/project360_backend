const express = require("express");
const router = express.Router();
const ProbationLetterController = require("../controllers/ProbationLetterControllers");

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
  "/probationletter",
  upload.single("file"),
  ProbationLetterController.postProbationLetter
);
router.get("/download/:fileName", ProbationLetterController.probationDownload);
router.get(
  "/allprobationfiles",
  ProbationLetterController.getAllProbationFiles
);

module.exports = router;
