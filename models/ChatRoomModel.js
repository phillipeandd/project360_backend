const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Group name
    isGroup: { type: Boolean, default: false }, // Check if it's a group chat
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Group members
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Group admin
   
  },
  { timestamps: true }
);

const ChatRoomModel = mongoose.model("ChatRoom", chatRoomSchema);
module.exports = ChatRoomModel;
