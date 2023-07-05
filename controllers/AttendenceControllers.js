const { AttendenceModel } = require("../models/AttendenceModel");
const UserModel = require("../models/UserModel");
// Create a new attendance record
// const createAttendanceRecord = async (req, res) => {
//   const { employee_id, ...attendanceFields } = req.body;
//   try {
//     const attendance = await AttendenceModel.create({
//       employee_id,
//       ...attendanceFields,
//     });
//     res.status(404).send(attendance);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while marking attendance" });
//   }
// };
const createAttendanceRecord = async (req, res) => {
  const {
    employee_id,
    loginTime,
    logoutTime,
    breakInTime,
    breakOutTime,
    overtime,
  } = req.body;
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  try {
    // Check if attendance already exists for today
    const existingAttendance = await AttendenceModel.findOne({
      employee_id,
      date: today,
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ error: "Attendance already recorded for today" });
    }

    // Create new attendance record
    const attendance = new AttendenceModel({
      employee_id,
      date: today,
      loginTime,
      logoutTime,
      breakInTime,
      breakOutTime,
      overtime,
    });
    await attendance.save();
    res
      .status(404)
      .send({ Message: "Attendence Marked Successfully", attendance });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while marking attendance" });
  }
};

// Update an existing attendance record
const updateAttendence = async (req, res) => {
  try {
    const attendance = await AttendenceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all attendance records
const getAllAttendanceRecords = async (req, res) => {
  try {
    const attendances = await AttendenceModel.find();
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Attendence By Id
const getAttendenceById = async (req, res) => {
  const id = req.params.id;
  try {
    const attendenceById = await AttendenceModel.findOne({ _id: id });

    res.status(404).send({ Message: "Attendence By Id", attendenceById });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createAttendanceRecord,
  getAllAttendanceRecords,
  updateAttendence,
  getAttendenceById,
};
