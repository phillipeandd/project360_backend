const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getGroupByUserId,
  getMessagesByUserId,
  sendInvitation,
  acceptInvitation,
  rejectInvitation,
  createGroup,
  sendGroupMessage,
  getGroupMessages,
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

router.post("/invite", sendInvitation);
router.post("/invite/accept", acceptInvitation);
router.post("/invite/reject", rejectInvitation);

// Create Group
router.post("/group/create", createGroup);
// Send Message to Group
router.post("/group/send", upload.array("files", 10), sendGroupMessage);
// Get Group by User ID
router.get("/group/:userId", getGroupByUserId);
// Get Group Messages by Group ID
router.get("/group/messages/:groupId", getGroupMessages);

module.exports = router;
