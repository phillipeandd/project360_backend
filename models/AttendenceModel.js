const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema(

);

const AttendenceModel = mongoose.model("Attendence", attendenceSchema);

module.exports = AttendenceModel;
