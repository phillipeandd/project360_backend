const express = require("express");
const router = express.Router();
const CompanyController = require("../controllers/CompanyControllers");
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
// Routes
router.post(
  "/createCompany",
  upload.fields([{ name: "files", maxCount: 10 }, { name: "logo", maxCount: 1 }]),
  CompanyController.createCompany
);

router.get("/getAllCompany", CompanyController.getAllCompanies);
router.get("/getAllCompany/:id", CompanyController.getCompanyById);
router.put(
  "/updateCompany/:id",
  upload.fields([{ name: "files", maxCount: 10 }, { name: "logo", maxCount: 1 }]),
  CompanyController.updateCompany
);

router.delete("/deleteCompany/:id", CompanyController.deleteCompany);
router.post("/companylogin", CompanyController.loginCompany);

module.exports = router;
