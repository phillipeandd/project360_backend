const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
});

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    message: { type: String },

    files: { type: [fileSchema], default: [] }, 

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
  },
  { timestamps: true }
);

// Custom validation: Either 'receiver' or 'chatRoom' must be set
messageSchema.pre("save", function (next) {
  if (!this.receiver && !this.chatRoom) {
    return next(new Error("Message must have either a receiver or a chatRoom."));
  }
  next();
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
