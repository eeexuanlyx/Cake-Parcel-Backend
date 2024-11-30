const pool = require("../../db");

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT user_name, user_email FROM users WHERE user_id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile };
