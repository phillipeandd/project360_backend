const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    department: {
      type: [String],
      required: true,
    },
    list: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ReminderModel = mongoose.model("Reminder", ReminderSchema);

module.exports = { ReminderModel, ReminderSchema };
