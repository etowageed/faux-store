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

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Guitar" }],
  [2, { priceInCents: 20000, name: "keyboard" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "ngn",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      //   success_url: `${process.env.SERVER_URL}/success.html`,
      //   cancel_url: `${process.env.SERVER_URL}/cancel.html`,

      // success_url: `${process.env.CLIENT_URL}/success.html`,
      // cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log("server running on port 3000"));
