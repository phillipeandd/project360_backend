const mongoose = require("mongoose");

const EarlyLogoutSchema = new mongoose.Schema({
  employee_id: { type: String, ref: "User" },
  type: { type: String, default: "Early Logout" },
  to: [String],
  currentDate: { type: Date },
  start_date: { type: Date },
  at: { type: String },
  message: { type: String },
  earlylogout_status: { type: String, default: "Pending" },
});

const EarlyLogoutModel = mongoose.model("EarlyLogout", EarlyLogoutSchema);

module.exports = { EarlyLogoutModel, EarlyLogoutSchema };
