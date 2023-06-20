const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String,required: true },
    team: { type: String, required: true },
    employee: { type: String, required: true },
    priority: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    task_status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
