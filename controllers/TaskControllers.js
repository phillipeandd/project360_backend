const TaskModel = require("../models/TaskModel");



//Post a task
const assignTask = async (req, res) => {
  try{
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
      task_status
    });
    await new_task.save();
    res.status(404).send({ Message: "Task Posted Successfully", new_task });
  }
  catch (error) {
    res.status(500).json({ error: 'Error posting task.' });
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

module.exports = { assignTask, seeAllTask, deleteTask, editTask };
