const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema(
  {
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date },
    loginTime: { type: Date,default: Date },
    loggedIn:{type:Boolean, default:false},
    logoutTime: { type: Date },
    breakInTime: [{ type: Date }],
    breakIn :{type:Boolean, default:false},
    breakOutTime: [{ type: Date }],
    overtime: { type: Boolean, default: false },
    status: { type: String, default: "Unavailable" },
  },
  { timestamps: true }
);

const AttendenceModel = mongoose.model("Attendence", attendenceSchema);

module.exports = { AttendenceModel, attendenceSchema };
