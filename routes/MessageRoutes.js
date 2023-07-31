// routes.js
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageControllers');

// Define routes
router.post('/messages', MessageController.createMessage);

module.exports = router;
