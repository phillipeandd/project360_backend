const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserControllers");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

router.post("/signuser", upload.single("file"), UserController.newUserRegister);
router.post("/login", UserController.login);
router.get("/users", UserController.getUser);
router.get("/singleUser/:id", UserController.getSingleUser);
router.delete("/deleteUser/:id", UserController.deleteUser);
// router.patch("/editUser/:id", UserController.editUser)
router.patch("/editUser/:id", upload.single("file"), UserController.editUser);


module.exports = router;
