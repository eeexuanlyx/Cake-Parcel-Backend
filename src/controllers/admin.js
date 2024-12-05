const pool = require("../../db");

const viewOrders = async (req, res) => {
  try {
    const result = await pool.query(`
SELECT 
    invoices.invoice_id,
    invoices.total_price,
    invoices.order_date,
    invoices.status,
    user_data.user_id,
    user_data.street_name,
    user_data.unit_number,
    user_data.postal_code,
    user_data.contact_number,
    invoice_products.product_id,
    invoice_products.quantity,
    invoice_products.price,
    invoice_products.selected_size,
    invoice_products.selected_flavour,
    products.name AS product_name,
	users.user_name AS user_name
FROM 
    invoices
INNER JOIN 
    user_data ON invoices.user_id = user_data.user_id
INNER JOIN 
    invoice_products ON invoices.invoice_id = invoice_products.invoice_id
INNER JOIN 
    products ON invoice_products.product_id = products.id
INNER JOIN 
	users ON invoices.user_id = users.user_id
ORDER BY invoices.order_date DESC

      `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching admin invoices:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { viewOrders };