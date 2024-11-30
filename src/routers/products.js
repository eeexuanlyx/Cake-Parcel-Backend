const { getProducts } = require("../controllers/products");
const { seedProducts } = require("../seeds/seedProducts");

const router = require("express").Router();

router.post("/seed", seedProducts);
router.get("/", getProducts);
module.exports = router;
