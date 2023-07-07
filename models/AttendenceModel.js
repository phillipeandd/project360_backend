const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema(
  {
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date },
    loginTime: { type: Date,default: Date },
    logoutTime: { type: Date },
    breakInTime: { type: Date },
    breakOutTime: { type: Date },
    overtime: { type: Boolean, default: true },
    status: { type: String, default: "Unavailable" },
  },
  { timestamps: true }
);

const AttendenceModel = mongoose.model("Attendence", attendenceSchema);

module.exports = { AttendenceModel, attendenceSchema };
