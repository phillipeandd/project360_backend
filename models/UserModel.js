const mongoose = require("mongoose");
// const AttendenceModel = require("../models/AttendenceModel");
// const LeaveModel = require("../models/LeaveModel");
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, default: "" },
    father_name: { type: String, required: true },
    mother_name: { type: String, required: true },
    employee_id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    alternate_email: { type: String, default: "" },
    phone: { type: String, required: true },
    alternate_phone: { type: String, default: "" },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    country: { type: String, default: "India" },
    city: { type: String, required: true },
    state: { type: String, default: "" },
    zip_code: { type: String, default: "" },
    sudo_name: { type: String, required: true },
    blood_group: { type: String, default: "" },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    marital_status: { type: String, default: "" },
    doj: { type: Date, required: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
    role: { type: String, required: true },
    account_holder_name: { type: String, default: "" },
    bank_name: { type: String, default: "" },
    ifsc: { type: String, default: "" },
    account_number: { type: String, default: "" },
    branch_name: { type: String, default: "" },
    upi_id: { type: String, default: "" },
    registered_phone: { type: String, default: "" },
    aadhar: { type: String, required: true },
    name: String,
    path: String,
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
