const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
});
const chatRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Group name
    files: { type: [fileSchema], default: [] }, 
    isGroup: { type: Boolean, default: false }, // Check if it's a group chat
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Group members
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Group admin
   
  },
  { timestamps: true }
);

const ChatRoomModel = mongoose.model("ChatRoom", chatRoomSchema);
module.exports = ChatRoomModel;
