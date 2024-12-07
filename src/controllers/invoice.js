const pool = require("../../db");

const addCartToInvoice = async (req, res) => {
  const { userId, cartItems, deliveryDate, deliverySlot } = req.body;

  if (!userId || !cartItems || cartItems.length === 0 || !deliveryDate) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Insert into invoices table
    const invoiceResult = await client.query(
      `INSERT INTO invoices (user_id, total_price, delivery_date, delivery_slot) 
         VALUES ($1, $2, $3, $4) 
         RETURNING invoice_id`,
      [userId, totalPrice, deliveryDate, deliverySlot]
    );
    const invoiceId = invoiceResult.rows[0].invoice_id;

    // Insert into invoice_products table
    const invoiceItemsPromises = cartItems.map((item) =>
      client.query(
        `INSERT INTO invoice_products (invoice_id, product_id, quantity, price, selected_size, selected_flavour)
           VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          invoiceId,
          item.product_id,
          item.quantity,
          item.price,
          item.selected_size,
          item.selected_flavour,
        ]
      )
    );

    await Promise.all(invoiceItemsPromises);

    // Clear the user's cart
    await client.query("DELETE FROM carts WHERE user_id = $1", [userId]);

    // Commit the transaction
    await client.query("COMMIT");

    res.status(201).json({ message: "Checkout successful", invoiceId });
  } catch (error) {
    // Rollback transaction in case of error
    await client.query("ROLLBACK");
    console.error("Checkout error:", error.message);
    res.status(500).json({ error: "Checkout failed" });
  } finally {
    client.release();
  }
};

const getMyOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const query = `SELECT 
    invoices.invoice_id,
    products.name,
    invoice_products.quantity,
    invoice_products.selected_size,
    invoice_products.selected_flavour,
    invoice_products.price,
    invoices.total_price,
    invoices.order_date,
    invoices.delivery_date,
    invoices.delivery_slot,
    invoices.status
FROM 
    invoices 
JOIN 
    invoice_products ON invoices.invoice_id = invoice_products.invoice_id
JOIN 
    products ON invoice_products.product_id = products.id
WHERE 
    invoices.user_id = $1
ORDER BY 
    invoices.order_date DESC;
`;
    const { rows } = await pool.query(query, [userId]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

module.exports = { addCartToInvoice, getMyOrders };
