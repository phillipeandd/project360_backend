const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
});
const eventSchema = new mongoose.Schema(
  {
    files: [fileSchema], 
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: [String],
    employee: [String],
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
