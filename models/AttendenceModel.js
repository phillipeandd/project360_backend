const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    loginTime: { type: Date, required: true },
    logoutTime: { type: Date, required: true },
    breakIn: { type: Boolean, default: false },
    breakInTime: { type: Date },
    breakOutTime: { type: Date },
    overtime: { type: Date, default: false },
  },
  { timestamps: true }
);

const AttendenceModel = mongoose.model("Attendence", attendenceSchema);

module.exports = AttendenceModel;
