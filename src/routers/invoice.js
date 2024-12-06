const router = require("express").Router();
const { addCartToInvoice, getMyOrders } = require("../controllers/invoice");
const { auth } = require("../middleware/auth");

router.post("/checkout", auth, addCartToInvoice);
router.get("/my-orders", auth, getMyOrders);

module.exports = router;
