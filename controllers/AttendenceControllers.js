const {AttendenceModel} = require("../models/AttendenceModel");
const UserModel = require("../models/UserModel");
// Create a new attendance record
const createAttendanceRecord = async (req, res) => {
  // try {
  //   const attendance = new AttendenceModel(req.body);
  //   await attendance.save();
  //   res.status(201).json(attendance);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
  // try {
  //   const { _id, date, loginTime, logoutTime, breakInTime, breakOutTime, overtime } = req.body;

  //   // Check if the user exists
  //   const user = await UserModel.findById(_id);
  //   if (!user) {
  //     return res.status(404).json({ error: 'User not found' });
  //   }

  //   // Create the attendance record with the user ID
  //   const attendance = new AttendenceModel({
  //     user: _id,
  //     date,
  //     loginTime,
  //     logoutTime,
  //     breakInTime,
  //     breakOutTime,
  //     overtime
  //   });

  //   await attendance.save();
  //   res.status(201).json(attendance);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }

  const { employee_id, ...attendanceFields } = req.body; 

  try {
    // Create attendance record
    const attendance = await AttendenceModel.create({
      employee_id,
      ...attendanceFields,
    });

    res.status(200).json({ message: "Attendance marked successfully", attendance });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while marking attendance" });
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

const EmployeeAttendence = async (req, res) => {
// app.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params._id;

    // Fetch the user document
    const user = await UserModel.findById(userId);

    // Fetch the attendance documents for the user
    const attendances = await AttendenceModel.find({ user: userId });

    res.json({ user, attendances });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createAttendanceRecord,
  getAllAttendanceRecords,
  updateAttendence,
  getAttendenceById,
  EmployeeAttendence
};
