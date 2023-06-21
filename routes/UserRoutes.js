const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserControllers");
// const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });

router.post("/signuser", UserController.newUserRegister);
router.post("/login", UserController.login);
router.get("/users", UserController.getUser);
router.get("/singleUser/:id", UserController.getSingleUser);

module.exports = router;



