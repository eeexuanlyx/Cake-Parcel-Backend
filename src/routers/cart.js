const { addToCart } = require("../controllers/cart");
const { auth } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", auth, addToCart);

module.exports = router;
