const pool = require("../../db");

const uploadRequest = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null; // Cloudinary URL of uploaded image
    const { title, description } = req.body;

    const query = `
      INSERT INTO user_requests (user_id, image_url, title, description)
      VALUES ($1, $2, $3, $4) RETURNING id, user_id, image_url, title, description, created_at
    `;
    const values = [req.user.id, imageUrl, title, description];

    const result = await pool.query(query, values);

    const savedData = result.rows[0];
    res.json({ success: true, data: savedData });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image." });
  }
};

module.exports = { uploadRequest };
