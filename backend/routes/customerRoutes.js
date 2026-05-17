const router = require("express").Router();

const Customer =
  require("../models/Customer");


// ADD CUSTOMER
router.post("/add", async (req, res) => {

  try {

    const customer =
      new Customer(req.body);

    await customer.save();

    res.status(200).json({
      success: true,
      message: "Customer Added"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed"
    });
  }
});


// ALL CUSTOMERS
router.get("/all", async (req, res) => {

  try {

    const customers =
      await Customer.find();

    res.json(customers);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);
  }
});


// INSIDE CUSTOMERS
router.get(
  "/inside/:name",
  async (req, res) => {

    try {

      const customers =
        await Customer.find({

          assignedTo:
            req.params.name

        });

      res.json(customers);

    } catch (err) {

      console.log(err);

      res.status(500).json(err);
    }
  }
);


// INTERESTED
router.get(
  "/inside/:name/interested",
  async (req, res) => {

    try {

      const customers =
        await Customer.find({

          assignedTo:
            req.params.name,

          status:
            "interested"

        });

      res.json(customers);

    } catch (err) {

      console.log(err);

      res.status(500).json(err);
    }
  }
);


// NOT INTERESTED
router.get(
  "/inside/:name/not-interested",
  async (req, res) => {

    try {

      const customers =
        await Customer.find({

          assignedTo:
            req.params.name,

          status:
            "not interested"

        });

      res.json(customers);

    } catch (err) {

      console.log(err);

      res.status(500).json(err);
    }
  }
);


// UPDATE STATUS
router.put("/:id", async (req, res) => {

  try {

    await Customer.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Updated"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);
  }
});


module.exports = router;