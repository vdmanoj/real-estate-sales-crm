const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");


// =========================
// ADD CUSTOMER
// =========================
router.post("/add", async (req, res) => {
  try {
    const customer = new Customer(req.body);

    await customer.save();

    res.json({
      success: true,
      message: "Customer Added Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to add customer"
    });
  }
});


// =========================
// GET ALL CUSTOMERS
// =========================
router.get("/all", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});


// =========================
// INTERESTED CUSTOMERS
// =========================
router.get("/inside/:name/interested", async (req, res) => {
  try {
    const customers = await Customer.find({
      status: "interested"
    });

    res.json(customers);

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});


// =========================
// NOT INTERESTED CUSTOMERS
// =========================
router.get("/inside/:name/not-interested", async (req, res) => {
  try {
    const customers = await Customer.find({
      status: "not interested"
    });

    res.json(customers);

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});


// =========================
// 🔥 FIXED: OUTSIDE ASSIGNED CUSTOMERS (NEW)
// =========================
router.get("/outside/:name/assigned", async (req, res) => {
  try {

    const customers = await Customer.find({
      outsideAssignedTo: req.params.name
    });

    res.json(customers);

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});


// =========================
// UPDATE STATUS
// =========================
router.put("/:id", async (req, res) => {
  try {

    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      customer: updated
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});


// =========================
// ASSIGN CUSTOMER
// =========================
router.put("/assign/:id", async (req, res) => {
  try {

    const { outsideAssignedTo, visitDate } = req.body;

    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        outsideAssignedTo,
        visitDate,
        status: "interested"
      },
      { new: true }
    );

    res.json({
      success: true,
      customer: updated
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false
    });
  }
});

module.exports = router;