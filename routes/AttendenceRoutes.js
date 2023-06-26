const express = require("express");
const router = express.Router();
const AttendenceController = require("../controllers/AttendenceControllers");

router.get("/allattendence", AttendenceController.getAllAttendanceRecords);
router.post("/attendence", AttendenceController.createAttendanceRecord);
router.get("/attendence/:id", AttendenceController.getAttendenceById);
router.post("/breakin/:id", AttendenceController.setBreakIn);
router.post("/breakout/:id", AttendenceController.setBreakOut);
router.post("/overtime/:id", AttendenceController.overtime);

module.exports = router;
