const pool = require("../../db");

//search by name and filter by type
const getProducts = async (req, res) => {
  const { search, type } = req.query;

  const queryParts = ["SELECT * FROM products"];
  const values = [];
  const conditions = [];

  if (search) {
    conditions.push(
      `(name ILIKE $${values.length + 1} OR description ILIKE $${
        values.length + 1
      })`
    );
    values.push(`%${search}%`);
  }

  if (type) {
    conditions.push(`type = $${values.length + 1}`);
    values.push(type);
  }

  if (conditions.length > 0) {
    queryParts.push("WHERE " + conditions.join(" AND "));
  }

  const query = queryParts.join(" ");

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Error fetching products");
  }
};

module.exports = { getProducts };
