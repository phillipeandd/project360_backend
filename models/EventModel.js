const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: String,
    path: String,
    eventtitle: { type: String, required: true },
    eventdescription: { type: String, required: true },
    department: [String],
    employee: [String],
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    selectedDate: { type: Date, required: true }
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
