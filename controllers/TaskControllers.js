const TaskModel = require("../models/TaskModel");

//Post a task
const assignTask = async (req, res) => {
  try {
    const {
      title,
      description,
      team,
      employee,
      priority,
      start_date,
      end_date,
      task_status,
    } = req.body;
    const new_task = new TaskModel({
      title,
      description,
      team,
      employee,
      priority,
      start_date,
      end_date,
      file: `/uploads/${req.file.filename}`,
      task_status,
    });
    await new_task.save();
    res.status(404).send({ Message: "Task Posted Successfully", new_task });
  } catch (error) {
    res.status(500).json({ error: "Error posting task." });
  }
};

// const assignTaskTest = async (req, res) => {
//   try {
//     const { file } = req;
//     const {
//       title,
//       description,
//       team,
//       employee,
//       priority,
//       start_date,
//       end_date,
//       task_status,
//     } = req.body;
//     const new_task = new TaskModel({
//       title,
//       description,
//       team,
//       employee,
//       priority,
//       start_date,
//       end_date,
//       name: file.originalname,
//       path: file.path,
//       task_status,
//     });
//     await new_task.save();
//     res.status(404).send({ Message: "Task Posted Successfully", new_task });
//   } catch (error) {
//     res.status(500).json({ error: "Error posting task." });
//   }
// };

const postMultipleEmployeeTask = async (req, res) => {
  try {
    const { files } = req;
    const {
      title,
      description,
      department,
      employee,
      priority,
      start_date,
      end_date,
      task_status,
    } = req.body;

    const fileArray = files.map((file) => ({
      name: file.originalname,
      path: file.path,
    }));

    const new_task = new TaskModel({
      title,
      description,
      department,
      employee,
      priority,
      start_date,
      end_date,
      task_status,
      files: fileArray,
    });

    await new_task.save();
    res.status(200).send({ message: "Task posted successfully", new_task });
  } catch (err) {
    console.error("Error posting task", err);
    res.status(500).send("Error posting task");
  }
};

const assignTaskTest = async (req, res) => {
  try {
    const { files } = req;
    const {
      title,
      description,
      team,
      employee,
      priority,
      start_date,
      end_date,
      task_status,
    } = req.body;

    const fileArray = files.map((file) => ({
      name: file.originalname,
      path: file.path,
    }));

    const new_task = new TaskModel({
      title,
      description,
      team,
      employee,
      priority,
      start_date,
      end_date,
      files: fileArray, // Use the array of file objects
      task_status,
    });

    await new_task.save();
    res.status(201).json({ message: "Task Posted Successfully", new_task });
  } catch (error) {
    res.status(500).json({ error: "Error posting task." });
  }
};

// See all task
const seeAllTask = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit Tatsk
const editTask = async (req, res) => {
  try {
    const tasks = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!tasks) {
      return res.status(404).send();
    }

    res.send(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.deleteOne({ _id: id });
    res.send({ Message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  assignTask,
  assignTaskTest,
  seeAllTask,
  deleteTask,
  editTask,
  postMultipleEmployeeTask
};
