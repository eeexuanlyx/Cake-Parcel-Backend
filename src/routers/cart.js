const {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCartItem,
} = require("../controllers/cart");
const { auth } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", auth, addToCart);
router.get("/", auth, getCartItems);
router.delete("/:id", auth, removeFromCart);
router.put("/:id", auth, updateCartItem);

module.exports = router;
