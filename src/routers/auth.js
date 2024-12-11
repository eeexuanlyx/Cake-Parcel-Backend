const { register, login, refreshAccessToken } = require("../controllers/auth");
const userValidator = require("../validators/userValidator");

const router = require("express").Router();

router.post("/register", userValidator, register);
router.post("/login", userValidator, login);
router.post("/refresh", refreshAccessToken);

module.exports = router;
