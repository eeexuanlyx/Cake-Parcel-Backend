const {
  register,
  login,
  verified,
  refreshAccessToken,
} = require("../controllers/auth");
const { auth } = require("../middleware/auth");
const userValidator = require("../validators/userValidator");

const router = require("express").Router();

router.post("/register", userValidator, register);
router.post("/login", userValidator, login);
router.post("/refresh", refreshAccessToken);

router.get("/verified", auth, verified);

module.exports = router;
