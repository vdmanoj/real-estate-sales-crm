const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// ROUTES
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");

app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);

// MONGODB CONNECTION
mongoose.connect(
  "mongodb://127.0.0.1:27017/salesDB"
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log("MongoDB Error");
  console.log(err);
});

// TEST
app.get("/", (req, res) => {
  res.send("Server Running");
});

// SERVER
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});