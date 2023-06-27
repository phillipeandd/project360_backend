const express = require("express");
const router = express.Router();
const AttendenceController = require("../controllers/AttendenceControllers");

router.get("/allattendence", AttendenceController.getAllAttendanceRecords);
router.post("/attendence", AttendenceController.createAttendanceRecord);
router.patch("/attendence/:id", AttendenceController.updateAttendence);
router.get("/attendence/:id", AttendenceController.getAttendenceById);
router.get("/userattendence/:id", AttendenceController.EmployeeAttendence)
module.exports = router;
