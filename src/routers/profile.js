const router = require("express").Router();
const pool = require("../../db");
const {
  getUserProfile,
  updateUser,
  getAddressContact,
  updateAddressContact,
} = require("../controllers/profile");
const { auth, authAdmin } = require("../middleware/auth");

router.get("/", auth, getUserProfile);
router.put("/", auth, updateUser);
router.get("/address", auth, getAddressContact);
router.post("/address", auth, updateAddressContact);

module.exports = router;
