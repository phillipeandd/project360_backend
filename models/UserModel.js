const mongoose = require("mongoose");
// const AttendenceModel = require("../models/AttendenceModel");
// const LeaveModel = require("../models/LeaveModel");
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    father_name: { type: String, required: true },
    mother_name: { type: String, required: true },
    employee_id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    alternate_email: { type: String, required: true },
    phone: { type: String, required: true },
    alternate_phone: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: String, required: true },
    sudo_name: { type: String, required: true },
    blood_group: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    marital_status: { type: String, required: true },
    doj: { type: Date, required: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
    role: { type: String, required: true },
    account_holder_name: { type: String, required: true },
    bank_name: { type: String, required: true },
    ifsc: { type: String, required: true },
    account_number: { type: String, required: true },
    branch_name: { type: String, required: true },
    upi_id: { type: String, required: true },
    registered_phone: { type: String, required: true },
    aadhar: { type: String, required: true },
    // attendances: [AttendenceModel.attendenceSchema],
    // leaves:[LeaveModel.LeaveSchema]
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
