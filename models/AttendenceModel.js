const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema(
  {
    employee_id: {
      type: String,
      required: true,
      ref: 'User'
    },
    date: { type: Date, default: Date },
    loginTime: { type: Date },
    logoutTime: { type: Date },
    breakInTime: { type: Date },
    breakOutTime: { type: Date },
    overtime: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const AttendenceModel = mongoose.model("Attendence", attendenceSchema);

module.exports = {AttendenceModel, attendenceSchema};
