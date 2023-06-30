const express = require("express");
const router = express.Router();
const LeaveController = require("../controllers/LeaveControllers");

router.post("/leaveletter", LeaveController.leaveletter);
router.get("/leaveletter", LeaveController.seeAllLetters);
router.patch("/leaveletter/:id", LeaveController.leaveapproval);

module.exports = router;
