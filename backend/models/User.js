const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: String,   // (kept as-is, no change requested)

  gender: String,

  phone: String,

 

  attendance: {
    type: String,
    default: "Absent"
  }

});

module.exports = mongoose.model("User", UserSchema);