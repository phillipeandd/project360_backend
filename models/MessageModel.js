// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {type: String},
  data: {type: String},
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;
