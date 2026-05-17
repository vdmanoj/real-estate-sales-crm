const router = require("express").Router();
const Attendance = require("../models/Attendance");

// LOGIN TIME
router.post("/login", async (req, res) => {
  await Attendance.create({
    userId: req.body.userId,
    loginTime: new Date()
  });

  res.json("Login time saved");
});

// LOGOUT TIME
router.post("/logout", async (req, res) => {
  await Attendance.findOneAndUpdate(
    { userId: req.body.userId, logoutTime: null },
    { logoutTime: new Date() }
  );

  res.json("Logout time saved");
});

module.exports = router;