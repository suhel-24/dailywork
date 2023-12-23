const express = require("express");
const router = express.Router();
const { finduser, adduser, getuser } = require("../controllers/dbcontroller");
const { protect } = require("../midllewares/auth");
router.post("/", adduser);
router.post("/login", finduser);
router.get("/me", protect, getuser);

module.exports = router;
