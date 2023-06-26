const AttendenceModel = require("../models/AttendenceModel");

// Attendence Record
const createAttendanceRecord = async (req, res) => {
  try {
    const {
      date,
      loginTime,
      logoutTime,
      breakIn,
      breakInTime,
      breakOutTime,
      overtime,
    } = req.body;
    const newRecord = new AttendenceModel({
      date,
      loginTime,
      logoutTime,
      breakIn,
      breakInTime,
      breakOutTime,
      overtime,
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get all attendance records
const getAllAttendanceRecords = async (req, res) => {
  try {
    const records = await AttendenceModel.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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

// Set break in status
const setBreakIn = async (req, res) => {
  try {
    const record = await AttendenceModel.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    if (record.breakIn) {
      return res.status(400).json({ error: "Break in already set" });
    }
    record.breakIn = true;
    record.breakInTime = new Date();
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Set break out status
const setBreakOut = async (req, res) => {
  try {
    const record = await AttendenceModel.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    if (!record.breakIn) {
      return res.status(400).json({ error: "Break check" });
    }
    record.breakIn = false;
    record.breakOutTime = new Date();
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Overtime
const overtime = async (req, res) => {
  try {
    const record = await AttendenceModel.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: "Overtime record not found" });
    }
    if (record.overtime) {
      return res.status(400).json({ error: "Overtime already set" });
    }
    record.overtime = true;
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAttendanceRecord,
  getAllAttendanceRecords,
  getAttendenceById,
  setBreakIn,
  setBreakOut,
  overtime,
};
