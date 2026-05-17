const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: String,

  gender: String,

  phone: String,

  profilePic: String
});

module.exports =
  mongoose.model(
    "User",
    UserSchema
  );