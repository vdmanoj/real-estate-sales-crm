const express = require("express");
const router = express.Router();
const User = require("../models/User");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// REGISTER
// REGISTER USER
router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
      gender,
      phone
    } = req.body;

    // CHECK EXISTING
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // CREATE USER
    const newUser = new User({
      name,
      email,
      password,
      role,
      gender,
      phone
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Employee Added Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Registration Failed"
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Login Success",
      user
    });

  } catch (err) {
    res.status(500).json({
      message: "Login Failed"
    });
  }
});

// GET ALL USERS
router.get("/all", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// INSIDE USERS
router.get("/inside", async (req, res) => {
  const users = await User.find({ role: "inside" });
  res.json(users);
});

// OUTSIDE USERS
router.get("/outside", async (req, res) => {
  const users = await User.find({ role: "outside" });
  res.json(users);
});

module.exports = router;