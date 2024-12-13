require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    // cors helps us to use different urls for the client and server
    // this particular url is that of vscode's liveserver that serves the client side code
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// app.use(express.static("public"));
// this is for when we want our clientside and server code at the same url meaning they're running from the same server

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    // Use the items directly from the request body
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "alipay", "klarna", "link"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: item.title,
              images: [item.image],
            },
            unit_amount: Math.round(item.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        };
      }),
      client_reference_id: `TRANS-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`,
      success_url: `${process.env.CLIENT_URL}/success?transaction_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancelled?reason=user_cancelled`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error("Stripe Session Error:", e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log("server running on port 3000"));
