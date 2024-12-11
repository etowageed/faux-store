const express = require("express");
const cors = require("cors");
const app = express();
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51QUcd1AsoR3EF3WoXRjkEG29a3rRISW21PYrBDifJj32UZ3yEfiPXe6hGG4GDY7L4WusLqTvIAS3Tpi3d2LdcIAj00hPZz8kCI"
);

app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "GBP",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5173, () => {
  console.log("server is running on port 5173");
});
