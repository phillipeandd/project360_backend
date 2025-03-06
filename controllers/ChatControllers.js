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

exports.getMessagesByUserId2 = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch messages where user is either sender or receiver
    const messages = await MessageModel.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name profileImage") // Populate sender details
      .populate("receiver", "name profileImage") // Populate receiver details
      .sort({ createdAt: -1 }); // Sort in ascending order (oldest to newest)

    // Group messages by conversation (sender-receiver pair)
    const chatMap = new Map();

    messages.forEach((msg) => {
      // Determine the conversation ID (Ensures uniqueness)
      const chatId =
        msg.sender._id.toString() === userId
          ? msg.receiver._id.toString()
          : msg.sender._id.toString();

      // If chat doesn't exist in map, initialize it
      if (!chatMap.has(chatId)) {
        chatMap.set(chatId, {
          user: msg.sender._id.toString() === userId ? msg.receiver : msg.sender,
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
          profileImage: "$userDetails.profileImage",
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
    );
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching messages", error });
  }
};
