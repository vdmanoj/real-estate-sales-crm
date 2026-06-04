const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ROUTES
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");

app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server Running");
});

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error");
    console.log(err);
  });

// PORT
const PORT = process.env.PORT || 5000;

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});