const { AttendenceModel } = require("../models/AttendenceModel");
const UserModel = require("../models/UserModel");

const createAttendanceRecord = async (req, res) => {
  const {
    employee_id,
    date,
    loginTime,
    loggedIn,
    logoutTime,
    breakInTime,
    breakIn,
    breakOutTime,
    overtime,
    status
  } = req.body;
  // const today = new Date().toISOString().split("T")[0]; 
  try {
    // Check if attendance already exists for today
    // const existingAttendance = await AttendenceModel.findOne({
    //   employee_id,
    //   date: today,
    // });

    // if (existingAttendance) {
    //   return res
    //     .status(400)
    //     .json({ error: "Attendance already recorded for today" });
    // }

    // Create new attendance record
    const attendance = new AttendenceModel({
      employee_id,
      date,
      loginTime,
      loggedIn,
      logoutTime,
      breakInTime,
      breakIn,
      breakOutTime,
      overtime,
      status
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



const getUserAttendenceById = async (req, res) => {
  const { employee_id } = req.params;
  try {
    const employeeRecords = await AttendenceModel.find({ employee_id: employee_id });

    res.status(200).json({ Message: "Attendence By Id", employeeRecords });
  } catch (error) {
    res.status(500).send(error);
  }
};



const breakInFunction = async (req,res)=>{
  const { attendanceId } = req.params;
  const { newBreakInData } = req.body;

  try {
    // Check if the attendance record exists
    const existingAttendance = await AttendenceModel.findById(attendanceId);
    if (!existingAttendance) {
      return res.status(404).json({ error: 'Attendance record not found.' });
    }

    // Update the breakInTime data in the database
    existingAttendance.breakInTime.push(newBreakInData.breakInTime);
    existingAttendance.breakIn = true;
    existingAttendance.status = "Unavailable";
    const updatedAttendance = await existingAttendance.save();

    // Send the updated data as a response
    res.json(updatedAttendance);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Failed to update breakInTime.' });
  }
}

const breakOutFunction = async (req,res)=>{
  const { attendanceId } = req.params;
  const { newBreakOutData } = req.body;

  try {
    // Check if the attendance record exists
    const existingAttendance = await AttendenceModel.findById(attendanceId);
    if (!existingAttendance) {
      return res.status(404).json({ error: 'Attendance record not found.' });
    }

    // Update the breakInTime data in the database
    existingAttendance.breakOutTime.push(newBreakOutData.breakOutTime);
    existingAttendance.breakIn = false;
    existingAttendance.status = "Available";
    const updatedAttendance = await existingAttendance.save();

    // Send the updated data as a response
    res.json(updatedAttendance);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Failed to update breakInTime.' });
  }
}

module.exports = {
  createAttendanceRecord,
  getAllAttendanceRecords,
  updateAttendence,
  getAttendenceById,
  breakInFunction,
  breakOutFunction,
  getUserAttendenceById
};


// Updated Things On Backend For Attendence