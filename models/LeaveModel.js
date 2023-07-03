const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  employee_id: { type: String, ref: "User" },
  type :{ type: String, default: "Leave" },
  to: [String],
  currentDate: { type: Date },
  start_date: { type: Date },
  end_date: { type: Date },
  message: { type: String },
  leave_status: { type: String, default: "Pending" }
});

const LeaveModel = mongoose.model("Leave", LeaveSchema);

module.exports = {LeaveModel,LeaveSchema};
