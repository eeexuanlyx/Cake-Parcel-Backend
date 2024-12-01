const pool = require("../../db");

const addToCart = async (req, res) => {
  const { product_id, selected_size, selected_flavour, quantity, price } =
    req.body;
  const user_id = req.user.id;

  if (
    !product_id ||
    !selected_size ||
    !selected_flavour ||
    !quantity ||
    !price
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the product already exists in the user's cart
    const existingItem = await pool.query(
      "SELECT * FROM carts WHERE user_id = $1 AND product_id = $2 AND selected_size = $3 AND selected_flavour = $4",
      [user_id, product_id, selected_size, selected_flavour]
    );

    if (existingItem.rows.length > 0) {
      // Update the quantity if the item already exists
      const updatedItem = await pool.query(
        "UPDATE carts SET quantity = quantity + $1, price = price + $2 WHERE id = $3 RETURNING *",
        [quantity, price * quantity, existingItem.rows[0].id]
      );

      return res.status(200).json({
        message: "Cart updated successfully.",
        cartItem: updatedItem.rows[0],
      });
    }

    // Add a new item to the cart
    const newItem = await pool.query(
      "INSERT INTO carts (user_id, product_id, selected_size, selected_flavour, quantity, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        user_id,
        product_id,
        selected_size,
        selected_flavour,
        quantity,
        price * quantity,
      ]
    );

    return res.status(201).json({
      message: "Product added to cart successfully.",
      cartItem: newItem.rows[0],
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { addToCart };
