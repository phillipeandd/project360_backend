const express = require("express");
const router = express.Router();
const ListController = require("../controllers/ListControllers");

router.post("/lists", ListController.addLists);
router.get("/lists", ListController.seeAllLists);
router.get("/lists/:id", ListController.getSingleList);
router.patch("/lists/:id", ListController.updateList);
router.delete("/lists/:id", ListController.deleteList); 

module.exports = router;
