const express = require("express");
const router = express.Router();
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.cartItems.map((item) => ({
        price_data: {
          currency: "sgd",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // Stripe accepts amounts in cents
        },
        quantity: item.quantity,
      })),
      metadata: {
        userId: req.body.metadata.userId,
        deliveryDate: req.body.metadata.deliveryDate,
        deliverySlot: req.body.metadata.deliverySlot,
      },
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/retrieve-session", async (req, res) => {
  const { session_id } = req.query;

  try {
    if (!session_id) {
      throw new Error("Session ID is required");
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session.metadata) {
      throw new Error("Session metadata is missing");
    }

    res.json(session);
  } catch (error) {
    console.error("Error retrieving session:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
