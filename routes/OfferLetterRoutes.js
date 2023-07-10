const express = require("express");
const router = express.Router();
const OfferLetterController = require("../controllers/OfferLetterControllers");

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
  "/offerletter",
  upload.single("file"),
  OfferLetterController.postOfferLetter
);
router.get("/download/:fileName", OfferLetterController.offerDownload);
router.get(
  "/allofferfiles",
  OfferLetterController.getAllOfferFiles
);

module.exports = router;
