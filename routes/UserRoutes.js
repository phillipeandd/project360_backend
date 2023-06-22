const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserControllers");
// const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });

router.post("/signuser", UserController.newUserRegister);
router.post("/login", UserController.login);
router.get("/users", UserController.getUser);
router.get("/singleUser/:id", UserController.getSingleUser);
router.delete("/deleteUser/:id", UserController.deleteUser);
router.patch("/editUser/:id", UserController.editUser)

module.exports = router;
