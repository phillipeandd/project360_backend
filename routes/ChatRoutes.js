const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getGroupByUserId,
  getMessagesByUserId,
  sendInvitation,
  acceptInvitation,
  rejectInvitation,
  getInvitationsBySender,
  createGroup,
  sendGroupMessage,
  getGroupMessages,
  removeMembersFromGroup,
  updateGroupMembers,
  deleteGroup,
  deleteMessageById,
  
} = require("../controllers/ChatControllers");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/send", upload.array("files", 10), sendMessage);
router.get("/messages/:userId", getMessagesByUserId);
// router.get("/messages/chatlist/:userId", getUserChatList);
router.post("/invite", sendInvitation);
router.get('/invitations/sender/:senderId', getInvitationsBySender);

router.post("/invite/accept", acceptInvitation);
router.post("/invite/reject", rejectInvitation);

// Create Group
router.post("/group/create", upload.array("files", 1), createGroup);
// Send Message to Group
router.post("/group/send", upload.array("files", 10), sendGroupMessage);
// Get Group by User ID
router.get("/group/:userId", getGroupByUserId);
// Get Group Messages by Group ID
router.get("/group/messages/:groupId", getGroupMessages);
// Remove members from a group
router.put("/remove-group-members", removeMembersFromGroup);
// Add or remove members from a group
router.put("/update-members", updateGroupMembers);

// Delete a group by groupId
router.delete("/delete-group", deleteGroup);
// Delete a specific message by message _id
router.delete("/delete-message", deleteMessageById);

module.exports = router;


// Add or remove members from a group
// {
//   "groupId": "67cfcdb2529b2c86c4daba4b",
//   "memberIds": ["649178fad0a79562e2057326"],
//   "action": "add" or "remove"
// }
