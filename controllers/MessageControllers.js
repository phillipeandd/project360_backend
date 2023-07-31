// controllers/messageController.js
const MessageModel = require("../models/MessageModel");

// Controller to handle new chat messages
const createMessage = async (req, res) => {
  try {
    const { message,data, employee_id } = req.body;
    const newMessage = new MessageModel({ message,data, employee_id });
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to save the message" });
  }
};

module.exports = {
  createMessage,
};
