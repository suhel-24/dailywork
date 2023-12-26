const express = require("express");
const router = express.Router();
const {
  getallgoals,
  setnewgoal,
  deletegoal,
  updategoal,
} = require("../controllers/goalcontroller");
const { protect } = require("../midllewares/auth");

router.get("/", protect, getallgoals);
router.post("/", protect, setnewgoal);
router.delete("/:id", protect, deletegoal);
router.put("/:id", protect, updategoal);

module.exports = router;
