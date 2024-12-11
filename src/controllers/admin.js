const pool = require("../../db");

const viewOrders = async (req, res) => {
  try {
    const result = await pool.query(`
SELECT 
    invoices.invoice_id,
    invoices.total_price,
    invoices.order_date,
    invoices.delivery_date, 
    invoices.delivery_slot, 
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

const updateOrderStatus = async (req, res) => {
  const { invoiceId } = req.params; // `invoiceId` from the request URL
  const { status } = req.body; // `status` from the request body

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  const query = `
      UPDATE invoices
      SET status = $1
      WHERE invoice_id = $2
      RETURNING *;
    `;

  try {
    const result = await pool.query(query, [status, invoiceId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res
      .status(200)
      .json({ message: "Order status updated", order: result.rows[0] });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const viewRequests = async (req, res) => {
  try {
    const result = await pool.query(`SELECT user_requests.id,
user_requests.image_url,
user_requests.title,
user_requests.description,
user_requests.created_at,
users.user_name,
users.user_email
FROM user_requests 
INNER JOIN
users ON user_requests.user_id = users.user_id
ORDER BY user_requests.created_at DESC`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching requests", error.message);
    res.status(500).json({ error: "server error" });
  }
};

module.exports = { viewOrders, updateOrderStatus, viewRequests };
