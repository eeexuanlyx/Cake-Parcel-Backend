const { viewOrders, updateOrderStatus } = require("../controllers/admin");
const { authAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.get("/invoices", authAdmin, viewOrders);
router.patch("/:invoiceId/status", authAdmin, updateOrderStatus);

module.exports = router;
