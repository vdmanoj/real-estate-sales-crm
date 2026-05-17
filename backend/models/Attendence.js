const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: String,
  loginTime: Date,
  logoutTime: Date
});

module.exports = mongoose.model("Attendance", attendanceSchema);