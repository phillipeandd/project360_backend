const express = require("express");
const router = express.Router();
const AttendenceController = require("../controllers/AttendenceControllers");

router.get("/attendence", AttendenceController.getAllAttendanceRecords);
router.post("/attendence", AttendenceController.createAttendanceRecord);
router.post("/updateBreakIns/:attendanceId", AttendenceController.breakInFunction);
router.post("/updateBreakOuts/:attendanceId", AttendenceController.breakOutFunction);
router.patch("/attendence/:id", AttendenceController.updateAttendence);
router.get("/attendence/:id", AttendenceController.getAttendenceById);
router.get("/allattendence/:employee_id", AttendenceController.getUserAttendenceById);

module.exports = router;
