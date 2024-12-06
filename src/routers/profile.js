const router = require("express").Router();
const {
  getUserProfile,
  updateUser,
  getAddressContact,
  updateAddressContact,
} = require("../controllers/profile");
const { auth } = require("../middleware/auth");

router.get("/", auth, getUserProfile);
router.put("/", auth, updateUser);
router.get("/address", auth, getAddressContact);
router.post("/address", auth, updateAddressContact);

module.exports = router;
