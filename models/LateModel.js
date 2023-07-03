const mongoose = require("mongoose");

const LateSchema = new mongoose.Schema({
  employee_id: { type: String, ref: "User" },
  type: { type: String, default: "Late Login" },
  to: [String],
  currentDate: { type: Date },
  start_date: { type: Date },
  at: { type: Date },
  message: { type: String },
  late_status: { type: String, default: "Pending" },
});

const LateModel = mongoose.model("Late", LateSchema);

module.exports = { LateModel, LateSchema };
