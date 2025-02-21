const express = require("express");
const router = express.Router();
const ReminderController = require("../controllers/ReminderControllers");

router.post("/reminder", ReminderController.reminder);
router.get("/reminder", ReminderController.seeAllReminders);
router.get("/reminder/:id", ReminderController.getSingleReminder);
router.get("/employeeReminder/:employee_id", ReminderController.getReminderByEmployeeId);
router.get("/reminderList", ReminderController.getRemindersByList);
router.patch("/reminder/:id", ReminderController.updateReminder);
router.delete("/reminder/:id", ReminderController.deleteReminder); 

module.exports = router;
