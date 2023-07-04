const { AttendenceModel } = require("../models/AttendenceModel");
const UserModel = require("../models/UserModel");
// Create a new attendance record
const createAttendanceRecord = async (req, res) => {
  const { employee_id, ...attendanceFields } = req.body;
  try {
    const attendance = await AttendenceModel.create({
      employee_id,
      ...attendanceFields,
    });
    res
      .status(200)
      .json({ message: "Attendance marked successfully", attendance });
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
