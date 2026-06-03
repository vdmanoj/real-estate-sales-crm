const router = require("express").Router();

const User = require("../models/User");


// REGISTER
router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
      gender,
      phone,
      profilePic
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const user = new User({

      name,
      email,
      password,
      role,
      gender,
      phone,
      profilePic
    });

    await user.save();

    res.json({

      success: true,
      message: "Registered Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,
      message: "Register Failed"
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        success: false,
        message: "User not found"
      });
    }

    if (user.password !== password) {

      return res.status(400).json({

        success: false,
        message: "Wrong Password"
      });
    }

    res.json({

      success: true,
      user
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,
      message: "Login Failed"
    });
  }
});


// GET ALL USERS
router.get("/all", async (req, res) => {

  try {

    const users =
      await User.find();

    res.json(users);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);
  }
});


// UPDATE PROFILE
router.put(
  "/update/:id",
  async (req, res) => {

    try {

      const updatedUser =
        await User.findByIdAndUpdate(

          req.params.id,

          {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            profilePic: req.body.profilePic
          },

          { new: true }

        );

      res.json({

        success: true,

        message:
          "Profile Updated Successfully",

        user: updatedUser
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message:
          "Profile Update Failed"
      });
    }
  }
);

module.exports = router;