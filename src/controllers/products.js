const pool = require("../../db");

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Error fetching products.");
  }
};

module.exports = { getAllProducts };
