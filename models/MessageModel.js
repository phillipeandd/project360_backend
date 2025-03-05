
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
});

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  //receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String },
  files: [fileSchema],
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: function () {
      return !this.chatRoom; // Required only if chatRoom is not set
    },
  },
  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatRoom",
    required: function () {
      return !this.receiver; // Required only if receiver is not set
    },
  },
}, { timestamps: true });

const MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;
