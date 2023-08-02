const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cart = require("../DB/models/cart");
router.use(express.json());

router.post('/api/addtocart', async (req, res) => {
  const { itemName, price, img, userId } = req.body;
  // console.log(itemName, price, img, userId);
  try {
    const cartItem = await Cart.findOneAndUpdate(
      { itemName },
      { $inc: { amount: 1 } },
      { new: true }
    );
    if (cartItem) {
      return res.json({ status: "ok", data: "Item quantity increased" });
    } else {
      const newCartItem = await Cart.create({ itemName, price, img, userId, amount: 1 });
      if (!newCartItem) {
        return res.json({ status: "failure", data: "Couldn't add item to cart" });
      }
      return res.json({ status: "ok", data: "Item added to cart successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ status: "error", data: "Error adding item to cart" });
  }
});

router.post("/api/cartData", async (req, res) => {
  let { userId } = req.body;
  try {
    const itemsInCart = await Cart.find({userId});
    if (!itemsInCart) {
      return res.json({status: "failed", data: "there are items in cart"})
    } 
    return res.json({status: "ok", data: itemsInCart})
  } catch (error) {
    console.error(error);
    throw new error('Error finding cart items!')
  }
})

module.exports = router;