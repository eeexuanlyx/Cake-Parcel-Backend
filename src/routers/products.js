const { seedProducts } = require("../seeds/seedProducts");

const router = require("express").Router();

router.post("/seed", seedProducts);

module.exports = router;
