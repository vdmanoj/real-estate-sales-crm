const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  userId: String,
  loginTime: String,
  logoutTime: String
});

module.exports = mongoose.model("Log", logSchema);