// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     // file: { type: String, required: true },
//     name: String,
//     path: String,
//     team: { type: String, required: true },
//     employee: { type: String, required: true },
//     priority: { type: String, required: true },
//     start_date: { type: Date, required: true },
//     end_date: { type: Date, required: true },
//     task_status: { type: String, default: "Pending" },
//   },
//   { timestamps: true }
// );

// const TaskModel = mongoose.model("Task", taskSchema);

// module.exports = TaskModel;


const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
});

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    files: [fileSchema], // Array of file objects
    // team: { type: String, required: true },
    // employee: { type: String, required: true },
    department: [String],
    employee: [String],
    priority: { type: String, required: true },
    start_date: { type: Date, required: true },
    hourly: { type: String, default: "" },
    quarterly: { type: String , default: ""},
    end_date: { type: Date, default: ""  },
    assigned_by: { type: String , default: ""},
    cc: { type: [String], default: []  },
    task_status: { type: String, default: "Pending" },
    task_approval: { type: String, default: "On Hold" },
    adminId :{type:mongoose.Schema.Types.ObjectId, ref: "User", required: false},
    companyId :{type:mongoose.Schema.Types.ObjectId, ref: "Company", required: false},
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;

