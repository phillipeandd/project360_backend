const express = require("express");
const router = express.Router();
const EarlyLogoutController = require("../controllers/EarlyLogoutControllers");

router.post("/earlylogout", EarlyLogoutController.earlylogoutletter);
router.get("/earlylogout", EarlyLogoutController.seeearlylogoutLetters);
router.patch("/earlylogout/:id", EarlyLogoutController.earlylogoutapproval);

module.exports = router;
