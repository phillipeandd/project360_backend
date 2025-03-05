const MessageModel = require("../models/MessageModel");
const InvitationModel = require("../models/InvitationModel");
const UserModel = require("../models/UserModel");
const ChatRoomModel = require("../models/ChatRoomModel");

exports.sendMessage = async (req, res) => {
  try {
    const { files } = req;
    const { sender, receiver, message } = req.body;

    const fileArray = files.map((file) => ({
      name: file.originalname,
      path: file.path,
    }));

    if (!sender || !receiver || !message) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const newMessage = new MessageModel({
      sender,
      receiver,
      message,
      files: fileArray,
    });
    await newMessage.save();

    // Check if io is defined before using it
    if (req.io) {
      req.io.to(receiver).emit("newMessage", newMessage);
    }

    res
      .status(200)
      .json({ success: true, message: "Message sent", data: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await MessageModel.find({ receiver: userId }).populate(
      "sender"
    );
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.sendInvitation = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const invitation = new InvitationModel({ sender, receiver });
    await invitation.save();
    res.status(200).json({ success: true, message: "Invitation sent" });
  } catch (error) {
    console.error("Error sending invitation:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.acceptInvitation = async (req, res) => {
  try {
    const { invitationId } = req.body;
    await InvitationModel.findByIdAndUpdate(invitationId, {
      status: "accepted",
    });
    res.status(200).json({ success: true, message: "Invitation accepted" });
  } catch (error) {
    console.error("Error accepting invitation:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.rejectInvitation = async (req, res) => {
  try {
    const { invitationId } = req.body;
    await InvitationModel.findByIdAndUpdate(invitationId, {
      status: "rejected",
    });
    res.status(200).json({ success: true, message: "Invitation rejected" });
  } catch (error) {
    console.error("Error rejecting invitation:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ 1. Create Group Chat
exports.createGroup = async (req, res) => {
  const { name, members, admin } = req.body;

  try {
    // Create new group
    const newGroup = new ChatRoomModel({ name, members, admin, isGroup: true });
    await newGroup.save();

    res.status(201).json({ success: true, group: newGroup });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating group", error });
  }
};

// ✅ 2. Send Message to Group

exports.sendGroupMessage = async (req, res) => {
  try {
    const { files } = req;
    const { sender, groupId, message } = req.body;

    if (!sender || !groupId || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const chatRoom = await ChatRoomModel.findById(groupId);
    if (!chatRoom || !chatRoom.isGroup) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    // Handle file uploads (if any)
    const fileArray = files?.length
      ? files.map((file) => ({
          name: file.originalname,
          path: file.path,
        }))
      : [];

    const newMessage = new MessageModel({
      sender,
      chatRoom: groupId,
      message,
      files: fileArray,
    });

    await newMessage.save();

    // Emit message to all group members
    if (req.io) {
      req.io.to(groupId).emit("newGroupMessage", newMessage);
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Message sent to group",
        data: newMessage,
      });
  } catch (error) {
    console.error("❌ Error sending group message:", error);
    res
      .status(500)
      .json({ success: false, message: "Error sending message", error });
  }
};


// ✅ 3. Get Messages from Group
exports.getGroupMessages = async (req, res) => {
  const { groupId } = req.params;

  try {
    const messages = await MessageModel.find({ chatRoom: groupId }).populate(
      "sender"
    );
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching messages", error });
  }
};
