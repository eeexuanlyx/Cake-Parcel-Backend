const { viewOrders } = require("../controllers/admin");
const { authAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.get("/invoices", authAdmin, viewOrders);

module.exports = router;
