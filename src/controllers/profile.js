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

const updateUser = async (req, res) => {
  const { user_email, user_password } = req.body;
  const userId = req.user.id;

  try {
    const hashedPassword = user_password
      ? await bcrypt.hash(user_password, 10)
      : undefined;
    let query = "UPDATE users SET ";
    const values = [];
    if (user_email) {
      values.push(user_email);
      query += `user_email = $${values.length}`;
    }
    if (hashedPassword) {
      values.push(hashedPassword);
      query +=
        values.length > 1
          ? `, user_password = $${values.length}`
          : `user_password = $${values.length}`;
    }
    query += ` WHERE user_id = $${values.length + 1} RETURNING *`;
    values.push(userId);

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile, updateUser };
