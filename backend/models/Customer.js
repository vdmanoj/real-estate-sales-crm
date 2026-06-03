const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({

  name: String,
  email: String,
  phone: String,

  assignedTo: {
    type: String,
    default: ""
  },

  outsideAssignedTo: {
    type: String,
    default: ""
  },

  visitDate: {
    type: String,
    default: ""
  },

  visited: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: [
      "pending",
      "interested",
      "not interested",
      "assigned",
      "visited",
      "completed"
    ],
    default: "pending"
  },

  createdBy: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Customer", customerSchema);