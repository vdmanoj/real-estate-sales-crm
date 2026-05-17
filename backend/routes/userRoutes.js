const router = require("express").Router();
const User = require("../models/User");

// ADD USER
router.post("/add", async (req, res) => {

  try {

    const user = new User(req.body);

    await user.save();

    res.json("User Added");

  } catch (err) {

    console.log(err);
    res.status(500).json("Server Error");
  }
});

// GET USERS
router.get("/", async (req, res) => {

  const users = await User.find();

  res.json(users);
});

// COUNT USERS
router.get("/count", async (req, res) => {

  const count = await User.countDocuments();

  res.json({ count });
});

// DELETE USER
router.delete("/:id", async (req, res) => {

  await User.findByIdAndDelete(req.params.id);

  res.json("Deleted");
});

// UPDATE USER
router.put("/:id", async (req, res) => {

  await User.findByIdAndUpdate(req.params.id, req.body);

  res.json("Updated");
});

module.exports = router;