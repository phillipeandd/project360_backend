const express = require("express");
const router = express.Router();
const LateController = require("../controllers/LateControllers");

router.post("/lateletter", LateController.lateletter);
router.get("/lateletter", LateController.seeLateLetters);
router.patch("/lateletter/:id", LateController.lateapproval);

module.exports = router;
