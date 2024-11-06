const { LateModel } = require("../models/LateModel");

//Post for leave letter
const lateletter = async (req, res) => {
  try {
    const {
      employee_id,
      type,
      to,
      currentDate,
      start_date,
      at,
      message,
      leave_status,
    } = req.body;
    const newData = new LateModel({
      employee_id,
      type,
      to,
      currentDate,
      start_date,
      at,
      message,
      leave_status,
    });
    await newData.save();
    res
      .status(201)
      .send({ Message: "Late Letter Posted Successfully", newData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
};

// Letter Approval
const lateapproval = async (req, res) => {
  try {
    const late = await LateModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!late) {
      return res.status(404).send();
    }
    res.status(201).send({
      Message: "Late Letter Approved Status Changed Successfully",
      late,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// All letters
const seeLateLetters = async (req, res) => {
  try {
    const late = await LateModel.find();
    if (!late) {
      return res.status(404).send();
    }
    res.send(late);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  lateletter,
  lateapproval,
  seeLateLetters,
};
