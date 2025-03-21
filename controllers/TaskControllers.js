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
      hourly,
      quarterly,
      assigned_by,
      cc,
      task_status,
      task_approval
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
      hourly,
      quarterly,
      assigned_by,
      cc,
      task_status,
      task_approval,
      files: fileArray,
    });

    await new_task.save();
    res.status(200).send({ message: "Task posted successfully", new_task });
  } catch (err) {
    console.error("Error posting task", err);
    res.status(500).send("Error posting task");
  }
};

const postMultipleEmployeeTaskById = async (req, res) => {
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
      hourly,
      quarterly,
      assigned_by,
      cc,
      task_status,
      task_approval,
      adminId,
      companyId,
    } = req.body;

    if(!adminId && !companyId) {
      return res.status(400).send({ message: "Either adminId or companyId is required to assign the task" });
    }

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
      hourly,
      quarterly,
      assigned_by,
      cc,
      task_status,
      task_approval,
      files: fileArray,
      adminId:adminId || null,
      companyId: companyId || null,
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

// See all task By Id
const seeAllTaskById = async (req, res) => {
  try {
    const { companyId, adminId } = req.query; // Get filters from query parameters

    let filter = {};

    if (companyId) {
      filter.companyId = companyId;
    } else if (adminId) {
      filter.adminId = adminId;
    }

    const tasks = await TaskModel.find(filter);

    if (!tasks || tasks.length === 0) {
      return res.status(404).send({ message: "No tasks found" });
    }

    res.send(tasks);
  } catch (error) {
    console.error("Error fetching tasks", error);
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
  seeAllTaskById,
  deleteTask,
  editTask,
  postMultipleEmployeeTask,
  postMultipleEmployeeTaskById
};
