// Small Express server that creates Stripe PaymentIntents.
// Run it with: npm run server   (the React site runs separately with: npm run dev)
import "dotenv/config"; // loads the .env file in the project root
import express from "express";
import Stripe from "stripe";

const PORT = 4242;

// Change "php" to "usd" here if your Stripe account rejects PHP.
const CURRENCY = "php";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Missing STRIPE_SECRET_KEY in .env (it should start with sk_test_).");
  process.exit(1);
}

// The secret key stays on the server. It is never sent to the browser.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());

// The Donate page calls this with { amount } in pesos, e.g. { amount: 250 }
app.post("/api/create-payment-intent", async (req, res) => {
  const amount = Number(req.body.amount);

  // Basic check so nobody sends a negative or tiny amount
  if (!Number.isInteger(amount) || amount < 100 || amount > 100000) {
    return res.status(400).json({ error: "Please choose an amount between 100 and 100,000." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe counts in the smallest unit (centavos)
      currency: CURRENCY,
      description: "Donation to Mga Munting Kamay",
    });

    // The page needs only the clientSecret to show the payment form
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Payment server running on http://localhost:${PORT}`);
});
