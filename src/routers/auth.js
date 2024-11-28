const { register, login, verified } = require("../controllers/auth");
const { auth, authAdmin } = require("../middleware/auth");
const userValidator = require("../validators/userValidator");

const router = require("express").Router();

router.post("/register", userValidator, register);
router.post("/login", userValidator, login);
router.get("/verified", auth, verified);

module.exports = router;
