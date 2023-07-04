const { EarlyLogoutModel } = require("../models/EarlyLogoutModel");

//Post for early logout
const earlylogoutletter = async (req, res) => {
  try {
    const {
      employee_id,
      type,
      to,
      currentDate,
      start_date,
      at,
      message,
      earlylogout_status,
    } = req.body;
    const newData = new EarlyLogoutModel({
      employee_id,
      type,
      to,
      currentDate,
      start_date,
      at,
      message,
      earlylogout_status,
    });
    await newData.save();
    res
      .status(404)
      .send({ Message: "Early Logout Posted Successfully", newData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
};

// Letter Approval
const earlylogoutapproval = async (req, res) => {
  try {
    const earlylogout = await EarlyLogoutModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!earlylogout) {
      return res.status(404).send();
    }
    res.status(404).send({
      Message: "Early Logout Approved Status Changed Successfully",
      earlylogout,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// All Early Logout letters
const seeearlylogoutLetters = async (req, res) => {
  try {
    const earlylogout = await EarlyLogoutModel.find();
    if (!earlylogout) {
      return res.status(404).send();
    }
    res.send(earlylogout);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  earlylogoutletter,
  earlylogoutapproval,
  seeearlylogoutLetters,
};
