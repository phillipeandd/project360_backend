const { ReminderModel } = require("../models/ReminderModel"); // Assuming you have a Reminder model

// Create a new reminder
const reminder = async (req, res) => {
  try {
    const {employee_id, title, notes, date, time, priority, department, list } = req.body;
    const newReminder = new ReminderModel({
      employee_id,
      title,
      notes,
      date,
      time,
      priority,
      department,
      list,
    });
    await newReminder.save();
    res.status(201).json({
      message: "Reminder created successfully",
      reminder: newReminder,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reminders
const seeAllReminders = async (req, res) => {
  try {
    const reminders = await ReminderModel.find();
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single reminder by ID
const getSingleReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await ReminderModel.findById(id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reminder by Employee ID
const getReminderByEmployeeId = async (req, res) => {
  try {
    const { employee_id } = req.params;
    
    // Find all reminder where employee_id matches
    const reminder = await ReminderModel.find({ employee_id });

    if (!reminder.length) {
      return res.status(404).json({ message: "No reminder found for this employee" });
    }

    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRemindersByList = async (req, res) => {
  try {
    const { list,employee_id } = req.body; // Get the list from the request body

    if (!list) {
      return res.status(400).json({ message: "List & Employee Id is required" });
    }

    // Find all reminders where list name matches
    const reminders = await ReminderModel.find({ list,employee_id });

    if (!reminders.length) {
      return res.status(404).json({ message: "No reminders found for this list" });
    }

    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update a reminder (for example, approving leave)
const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReminder = await ReminderModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    res
      .status(200)
      .json({ message: "Reminder updated", reminder: updatedReminder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a reminder
const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReminder = await ReminderModel.findByIdAndDelete(id);

    if (!deletedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  reminder,
  seeAllReminders,
  getSingleReminder,
  getReminderByEmployeeId,
  getRemindersByList,
  updateReminder,
  deleteReminder,
};
