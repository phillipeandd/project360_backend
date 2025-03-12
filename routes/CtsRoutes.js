const express = require("express");
const { submitContactForm } = require("../controllers/CtsControllers");

const router = express.Router();

router.post("/contact", submitContactForm);

module.exports = router;
