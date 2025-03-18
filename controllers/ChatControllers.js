const MessageModel = require("../models/MessageModel");
const InvitationModel = require("../models/InvitationModel");
const UserModel = require("../models/UserModel");
const ChatRoomModel = require("../models/ChatRoomModel");
const mongoose = require("mongoose");
exports.sendMessage = async (req, res) => {
  try {
    const { files = [] } = req;
    const { sender, receiver, message } = req.body;

    const fileArray = Array.isArray(files)
    ? files.map((file) => ({
        name: file.originalname,
        path: file.path,
      }))
    : [];

    if (!sender || !receiver) {
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

exports.sendMessage2 = async (req, res) => {
  try {
    const { files } = req;
    const { sender, receiver, chatRoom, message } = req.body;

    // Ensure at least a receiver (for direct messages) or a chat room (for group chats) is provided
    if (!sender || (!receiver && !chatRoom) || (!message && (!files || files.length === 0))) {
      return res.status(400).json({ success: false, message: "Invalid data: Missing sender, recipient, or message" });
    }

    // Process files if any are provided
    const fileArray = files
      ? files.map((file) => ({
          name: file.originalname,
          path: file.path,
        }))
      : [];

    // Create new message
    const newMessage = new MessageModel({
      sender,
      receiver: receiver || null, // Set to null if it's a group message
      chatRoom: chatRoom || null, // Set to null if it's a direct message
      message,
      files: fileArray,
    });

    await newMessage.save();

    // Emit message to the receiver (direct chat) or the chat room (group chat)
    if (req.io) {
      if (receiver) {
        // Direct message
        req.io.to(receiver).emit("newMessage", newMessage);
      } else if (chatRoom) {
        // Group message
        req.io.to(chatRoom).emit("newGroupMessage", newMessage);
      }
    }

    res.status(200).json({ success: true, message: "Message sent", data: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




exports.getMessagesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure userId is a string for comparison
    const userIdStr = userId.toString();

    // Fetch messages where user is either sender or receiver
    const messages = await MessageModel.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "path sudo_name profileImage")
      .populate("receiver", "path sudo_name profileImage")
      .sort({ createdAt: -1 });

    // Group messages by conversation (sender-receiver pair)
    const chatMap = new Map();

    messages.forEach((msg) => {
      if (!msg.sender || !msg.receiver) {
        console.warn("Skipping message with missing sender/receiver:", msg._id);
        return; // Skip messages with missing sender/receiver
      }

      // Convert ObjectId to string safely
      const senderId = msg.sender?._id?.toString();
      const receiverId = msg.receiver?._id?.toString();

      // Determine the conversation ID (Ensures uniqueness)
      const chatId = senderId === userIdStr ? receiverId : senderId;

      // If chat doesn't exist in map, initialize it
      if (!chatId || !chatMap.has(chatId)) {
        chatMap.set(chatId, {
          user: senderId === userIdStr ? msg.receiver : msg.sender,
          messages: [],
        });
      }

      // Push message into the corresponding chat
      chatMap.get(chatId).messages.push({
        _id: msg._id,
        text: msg.message,
        sender: msg.sender,
        createdAt: msg.createdAt,
        files: msg.files || [],
      });
    });

    // Convert Map to array for response
    const chatList = Array.from(chatMap.values());

    res.status(200).json({ success: true, chats: chatList });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.getGroupByUserId2 = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch one-on-one chats where user is sender or receiver
    const directChats = await MessageModel.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort messages by latest first
      },
      {
        $group: {
          _id: {
            user: {
              $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"],
            },
          },
          lastMessage: { $first: "$message" }, // Get latest message
          lastMessageAt: { $first: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: "$userDetails._id",
          name: "$userDetails.name",
          profileImage: "$userDetails.files",
          lastMessage: 1,
          lastMessageAt: 1,
        },
      },
      { $sort: { lastMessageAt: -1 } },
    ]);

    // Fetch group chats where user is a member
    const groupChats = await ChatRoomModel.find({
      members: userId,
      isGroup: true,
    })
      .populate("admin", "name profileImage")
      .populate("members", "name profileImage") // Fetch members' details
      .sort({ updatedAt: -1 });

    // Fetch last message for each group chat
    const formattedGroups = await Promise.all(
      groupChats.map(async (group) => {
        const lastMessage = await MessageModel.findOne({ chatRoom: group._id })
          .sort({ createdAt: -1 })
          .populate("sender", "name profileImage");

        return {
          _id: group._id,
          name: group.name,
          profileImage: group.admin?.profileImage || "", // Use admin profile pic as fallback
          lastMessage: lastMessage ? lastMessage.message : "No messages yet",
          lastMessageAt: lastMessage ? lastMessage.createdAt : group.updatedAt,
          members: group.members.map((member) => ({
            _id: member._id,
            name: member.name,
            profileImage: member.profileImage,
          })),
        };
      })
    );

    // Merge both direct and group chats and sort them by last message timestamp
    const chats = [...directChats, ...formattedGroups].sort(
      (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
    );

    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ success: false, message: "Error fetching chats" });
  }
};

exports.getGroupByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch one-on-one chats where user is sender or receiver
    const directChats = await MessageModel.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      { $sort: { createdAt: -1 } }, // Sort messages by latest first
      {
        $group: {
          _id: {
            user: {
              $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"],
            },
          },
          lastMessage: { $first: "$message" },
          lastMessageAt: { $first: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: "$userDetails._id",
          name: "$userDetails.name",
          profileImage: {
            $arrayElemAt: ["$userDetails.files.path", 0], // Get first file's path
          },
          lastMessage: 1,
          lastMessageAt: 1,
        },
      },
      { $sort: { lastMessageAt: -1 } },
    ]);

    // Fetch group chats where user is a member
    const groupChats = await ChatRoomModel.find({
      members: userId,
      isGroup: true,
    })
      .populate("admin", "name files")
      .populate("members", "name files")
      .sort({ updatedAt: -1 });

    // Fetch last message for each group chat
    const formattedGroups = await Promise.all(
      groupChats.map(async (group) => {
        const lastMessage = await MessageModel.findOne({ chatRoom: group._id })
          .sort({ createdAt: -1 })
          .populate("sender", "name files");

        return {
          _id: group._id,
          name: group.name,
          profileImage:
            group.files?.length > 0
              ? group.files[0].path // Use group's profile image
              : group.admin?.files?.[0]?.path || "", // Fallback to admin's image
          lastMessage: lastMessage ? lastMessage.message : "No messages yet",
          lastMessageAt: lastMessage ? lastMessage.createdAt : group.updatedAt,
          members: group.members.map((member) => ({
            _id: member._id,
            name: member.name,
            profileImage: member.files?.length > 0 ? member.files[0].path : "",
          })),
        };
      })
    );

    // Merge both direct and group chats and sort them by last message timestamp
    const chats = [...directChats, ...formattedGroups].sort(
      (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
    );

    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ success: false, message: "Error fetching chats" });
  }
};




exports.getMessages2 = async (req, res) => {
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

exports.getInvitationsBySender = async (req, res) => {
  try {
    const { senderId } = req.params; // Assuming senderId is passed as a URL parameter

    const invitations = await InvitationModel.find({ sender: senderId });

    if (!invitations.length) {
      return res.status(404).json({ success: false, message: "No invitations found for this sender" });
    }

    res.status(200).json({ success: true, invitations });
  } catch (error) {
    console.error("Error fetching invitations:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getInvitationsByReceiver = async (req, res) => {
  try {
    const { receiverId } = req.params;

    // Convert receiverId to ObjectId
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    const invitations = await InvitationModel.find({ receiver: receiverObjectId })
      .populate("sender", "first_name last_name email")
      .populate("receiver", "first_name last_name email")
      .exec();

    if (!invitations.length) {
      return res.status(404).json({ success: false, message: "No invitations found for this receiver." });
    }

    res.status(200).json({ success: true, invitations });
  } catch (error) {
    console.error("Error fetching invitations:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



exports.acceptInvitation2 = async (req, res) => {
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

exports.acceptInvitation = async (req, res) => {
  try {
    const { invitationId } = req.body;

    // Update invitation status
    const invitation = await InvitationModel.findByIdAndUpdate(
      invitationId,
      { status: "accepted" },
      { new: true }
    ).populate("sender receiver", "_id name"); // Fetch sender & receiver details

    if (!invitation) {
      return res.status(404).json({ success: false, message: "Invitation not found" });
    }

    // Auto-send a message upon acceptance
    const autoMessage = new MessageModel({
      sender: invitation.sender._id,
      receiver: invitation.receiver._id,
      message: `🎉 Congratulations your request has been accepted!!`,
      files: [], // No files in this case
    });

    await autoMessage.save();

    // Emit message event if socket.io is available
    if (req.io) {
      req.io.to(invitation.sender._id.toString()).emit("newMessage", autoMessage);
    }

    res.status(200).json({
      success: true,
      message: "Invitation accepted and message sent",
      data: autoMessage,
    });
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
  const { files = [] } = req;
  const { name, members, admin } = req.body;
  const fileArray = Array.isArray(files)
  ? files.map((file) => ({
      name: file.originalname,
      path: file.path,
    }))
  : [];

  try {
    // Create new group
    const newGroup = new ChatRoomModel({files: fileArray, name, members, admin, isGroup: true });
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
    res.status(200).json({
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
    ).sort({ createdAt: -1 });;
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching messages", error });
  }
};

// Remove members from group
exports.removeMembersFromGroup = async (req, res) => {
  try {
    const { groupId, memberIds } = req.body;

    // Ensure memberIds is an array
    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid member IDs" });
    }

    const updatedGroup = await ChatRoomModel.findByIdAndUpdate(
      groupId,
      { $pull: { members: { $in: memberIds } } }, // Remove members
      { new: true }
    ).populate("members", "name profileImage");

    if (!updatedGroup) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, group: updatedGroup });
  } catch (error) {
    console.error("Error removing members:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateGroupMembers = async (req, res) => {
  try {
    const { groupId, memberIds, action } = req.body; // action: "add" or "remove"

    // Validate request
    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid member IDs" });
    }

    let updateQuery = {};

    if (action === "add") {
      updateQuery = { $addToSet: { members: { $each: memberIds } } }; // Add members
    } else if (action === "remove") {
      updateQuery = { $pull: { members: { $in: memberIds } } }; // Remove members
    } else {
      return res.status(400).json({ success: false, message: "Invalid action" });
    }

    // Update group
    const updatedGroup = await ChatRoomModel.findByIdAndUpdate(groupId, updateQuery, { new: true })
      .populate("members", "name profileImage");

    if (!updatedGroup) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, group: updatedGroup });
  } catch (error) {
    console.error("Error updating group members:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Delete group by groupId
exports.deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.body;

    const deletedGroup = await ChatRoomModel.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    // Delete all messages related to this group
    await MessageModel.deleteMany({ chatRoom: groupId });

    res.status(200).json({ success: true, message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a specific group message by message _id
exports.deleteMessageById = async (req, res) => {
  try {
    const { messageId } = req.body;

    const deletedMessage = await MessageModel.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.status(200).json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
