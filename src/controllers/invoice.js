const pool = require("../../db");

const addCartToInvoice = async (req, res) => {
  const { userId, cartItems } = req.body;

  if (!userId || !cartItems || cartItems.length === 0) {
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
      `INSERT INTO invoices (user_id, total_price) 
         VALUES ($1, $2) 
         RETURNING invoice_id`,
      [userId, totalPrice]
    );
    const invoiceId = invoiceResult.rows[0].invoice_id;

    // Insert into invoice_products table
    const invoiceItemsPromises = cartItems.map((item) =>
      client.query(
        `INSERT INTO invoice_products (invoice_id, product_id, quantity, price)
           VALUES ($1, $2, $3, $4)`,
        [invoiceId, item.product_id, item.quantity, item.price]
      )
    );

    await Promise.all(invoiceItemsPromises);

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

module.exports = { addCartToInvoice };
