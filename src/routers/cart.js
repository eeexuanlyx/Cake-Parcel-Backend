const {
  addToCart,
  getCartItems,
  removeFromCart,
} = require("../controllers/cart");
const { auth } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", auth, addToCart);
router.get("/", auth, getCartItems);
router.delete("/:id", auth, removeFromCart);

module.exports = router;
