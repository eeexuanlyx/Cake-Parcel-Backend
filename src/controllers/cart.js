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

const getCartItems = async (req, res) => {
  const user_id = req.user.id;

  try {
    const cartItems = await pool.query(
      `
        SELECT 
            carts.id AS cart_id,
            carts.product_id,
            products.name,
            products.img,
            carts.selected_size,
            carts.selected_flavour,
            carts.quantity,
            carts.price,
            carts.created_at
        FROM carts
        INNER JOIN products ON carts.product_id = products.id
        WHERE carts.user_id = $1
        `,
      [user_id]
    );

    return res.status(200).json(cartItems.rows);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    return res.status(500).json({ message: "Failed to fetch cart items." });
  }
};

const removeFromCart = async (req, res) => {
  const { id } = req.params; // cart id
  const user_id = req.user.id;

  try {
    await pool.query("DELETE FROM carts WHERE id = $1 AND user_id = $2", [
      id,
      user_id,
    ]);

    res.status(200).json({ message: "Item removed from cart." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateCartItem = async (req, res) => {
  const { id } = req.params; // cart item ID
  const { quantity, selected_flavour, selected_size } = req.body;
  const user_id = req.user.id; // Assume `req.user.id` contains the logged-in user's ID

  // Fetch the product's sizes and calculate the price for the selected size
  const productQuery = `SELECT sizes FROM products WHERE id = (
      SELECT product_id FROM carts WHERE id = $1
    )`;
  try {
    const productResult = await pool.query(productQuery, [id]);
    if (productResult.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    const sizes = productResult.rows[0].sizes;
    const newPrice = selected_size ? sizes[selected_size] : undefined;

    const query = `
        UPDATE carts
        SET 
          quantity = COALESCE($1, quantity), 
          selected_flavour = COALESCE($2, selected_flavour),
          selected_size = COALESCE($3, selected_size),
          price = COALESCE($4, price)
        WHERE id = $5 AND user_id = $6
        RETURNING *;
      `;

    const { rows } = await pool.query(query, [
      quantity,
      selected_flavour,
      selected_size,
      newPrice,
      id,
      user_id,
    ]);
    if (rows.length === 0)
      return res
        .status(404)
        .send("Cart item not found or not authorized to update");
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).send("Error updating cart item");
  }
};

module.exports = { addToCart, getCartItems, removeFromCart, updateCartItem };
