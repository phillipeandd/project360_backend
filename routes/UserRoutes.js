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

// MONGO_URL="mongodb+srv://ed1907006:fXsNuUyXT2eftjVY@eandd360.nbmvw5t.mongodb.net/?retryWrites=true&w=majority"
// PORT="8081"
// SECRET="ABC123XYZ"

// mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1
