const router = require("express").Router();
const { addCartToInvoice } = require("../controllers/invoice");
const { auth } = require("../middleware/auth");

router.post("/checkout", auth, addCartToInvoice);

module.exports = router;
