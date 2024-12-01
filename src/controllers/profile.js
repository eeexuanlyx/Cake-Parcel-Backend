const pool = require("../../db");
const bcrypt = require("bcrypt");

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
  const { email, password } = req.body;
  const userId = req.user.id;

  try {
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    let query = "UPDATE users SET ";
    const values = [];

    if (email) {
      values.push(email);
      query += `user_email = $${values.length}`;
    }

    if (hashedPassword) {
      values.push(hashedPassword);
      query +=
        values.length > 1 // Check if there is second field to update
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

const getAddressContact = async (req, res) => {
  try {
    const userId = req.user.id;

    const query = "SELECT * FROM user_data WHERE user_id = $1";
    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Address not found." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const updateAddressContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { street_name, unit_number, postal_code, contact_number } = req.body;

    if (!street_name || !postal_code || !contact_number) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the address exists
    const checkQuery = "SELECT * FROM user_data WHERE user_id = $1";
    const checkResult = await pool.query(checkQuery, [userId]);

    if (checkResult.rows.length > 0) {
      // If address exists, update it
      const updateQuery = `
          UPDATE user_data 
          SET street_name = $1, unit_number = $2, postal_code = $3, contact_number = $4
          WHERE user_id = $5
        `;
      await pool.query(updateQuery, [
        street_name,
        unit_number,
        postal_code,
        contact_number,
        userId,
      ]);
      res.json({ message: "Address updated successfully!" });
    } else {
      // If no address exists, create it
      const insertQuery = `
          INSERT INTO user_data (user_id, street_name, unit_number, postal_code, contact_number)
          VALUES ($1, $2, $3, $4, $5)
        `;
      await pool.query(insertQuery, [
        userId,
        street_name,
        unit_number,
        postal_code,
        contact_number,
      ]);
      res.json({ message: "Address added successfully!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  getUserProfile,
  updateUser,
  getAddressContact,
  updateAddressContact,
};
