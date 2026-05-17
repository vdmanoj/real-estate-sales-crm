const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({

  name: String,

  email: String,

  phone: String,

  assignedTo: String,

  status: {
    type: String,
    enum: [
      "interested",
      "not interested"
    ],
    default: "interested"
  },

  createdBy: String

});

module.exports = mongoose.model(
  "Customer",
  customerSchema
);