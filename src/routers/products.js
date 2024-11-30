const { seedProducts } = require("../seeds/seedProducts");
const { getAllProducts } = require("../controllers/products");

const router = require("express").Router();

router.post("/seed", seedProducts);
router.get("/", getAllProducts);

module.exports = router;
