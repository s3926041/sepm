const router = require("express").Router();
const User = require("../models/User");

const { verifyToken } = require("./middleWare");

// });
router.get("/cart", verifyToken, async (req, res) => {
  const customerId = req.userId;
  try {
    const user = await Customer.findById(customerId);
    const cart = user.cart;
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/cart", verifyToken, async (req, res) => {
  const customerId = req.userId;
  const newCart = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { cart: newCart },
      { new: true }
    );

    res.status(200).json(updatedCustomer.cart);
  } catch (err) {
    res.status(500).json({ err, hung: "feef" });
  }
});



module.exports = router;
