const mongoose = require("mongoose");

const todoschema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appusers",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
};

module.exports = mongoose.model("usergoals", todoschema);
