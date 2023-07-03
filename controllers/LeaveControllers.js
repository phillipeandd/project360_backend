const {LeaveModel} = require("../models/LeaveModel");

//Post for leave letter
const leaveletter = async (req, res) => {
  try {
    const {
      employee_id,
      type,
      to,
      currentDate,
      start_date,
      end_date,
      message,
      leave_status,
    } = req.body;
    const newData = new LeaveModel({
      employee_id,
      type,
      to,
      currentDate,
      start_date,
      end_date,
      message,
      leave_status,
    });
    await newData.save();
    res
      .status(404)
      .send({ Message: "Leave Letter Posted Successfully", newData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
};

// Letter Approval
const leaveapproval = async (req, res) => {
  try {
    const leave = await LeaveModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!leave) {
      return res.status(404).send();
    }
    res
      .status(404)
      .send({
        Message: "Leave Letter Approved Status Changed Successfully",
        leave,
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

// All letters
const seeAllLetters = async (req, res) => {
    try {
      const leave = await LeaveModel.find();
      if (!leave) {
        return res.status(404).send();
      }
      res.send(leave);
    } catch (error) {
      res.status(500).send(error);
    }
  };

module.exports = {
  leaveletter,
  leaveapproval,
  seeAllLetters
};
