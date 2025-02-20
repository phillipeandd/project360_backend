const { ListModel } = require("../models/ListModel"); // Assuming you have a Reminder model

// Create a new list
const addLists = async (req, res) => {
  try {
    const { listName, listColor } = req.body;
    const newList = new ListModel({ listName, listColor });
    await newList.save();
    res.status(201).json({
      message: "List created successfully",
      list: newList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all rlist
const seeAllLists = async (req, res) => {
  try {
    const lists = await ListModel.find();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single list by ID
const getSingleList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await ListModel.findById(id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a list (for example, approving leave)
const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedList = await ListModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json({ message: "List updated", list: updatedList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a list
const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedList = await ListModel.findByIdAndDelete(id);

    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addLists,
  seeAllLists,
  getSingleList,
  updateList,
  deleteList,
};
