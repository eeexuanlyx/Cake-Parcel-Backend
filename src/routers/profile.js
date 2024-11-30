const router = require("express").Router();
const pool = require("../../db");
const { getUserProfile } = require("../controllers/profile");
const { auth, authAdmin } = require("../middleware/auth");

router.get("/", auth, getUserProfile);

module.exports = router;
