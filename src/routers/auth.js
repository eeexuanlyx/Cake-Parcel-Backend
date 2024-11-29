const { register, login, verified, getRoles } = require("../controllers/auth");
const { auth, authAdmin } = require("../middleware/auth");
const userValidator = require("../validators/userValidator");

const router = require("express").Router();

router.post("/register", userValidator, register);
router.post("/login", userValidator, login);

router.get("/verified", auth, verified);
router.get("/me", auth, getRoles);

module.exports = router;
