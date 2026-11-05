import { useState } from "react";
import type { FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Only the publishable key (pk_test_...) is used in the browser.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const amounts = [100, 250, 500, 1000];

type PayFormProps = {
  amount: number;
  name: string;
  onBack: () => void;
};

// Step 2: card details + Pay button. Runs inside <Elements> so it can use Stripe hooks.
function PayForm({ amount, name, onBack }: PayFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    // Confirms the PaymentIntent. "if_required" keeps us on this page for card payments.
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
        payment_method_data: { billing_details: { name } },
      },
      redirect: "if_required",
    });

    if (error) {
      // Declined cards, wrong CVC, etc. come back here
      setMessage(error.message ?? "Payment failed. Please try again.");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaid(true);
    } else {
      setMessage("Payment is still processing. Please check again in a moment.");
    }
    setLoading(false);
  }

  if (paid) {
    return (
      <div className="card">
        <h3>Thank you, {name}!</h3>
        <p>Your ₱{amount} donation will help a student get a full school bag.</p>
      </div>
    );
  }

  return (
    <form className="card donate-form" onSubmit={handleSubmit}>
      <h3>Donating ₱{amount} as {name}</h3>

      <label>Card details</label>
      <div className="card-box">
        <PaymentElement />
      </div>

      <button className="btn" type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay ₱${amount}`}
      </button>{" "}
      <button className="btn alt" type="button" onClick={onBack} disabled={loading}>
        Change amount
      </button>
      {message && <p role="alert">{message}</p>}
    </form>
  );
}

function Donate() {
  const [amount, setAmount] = useState(250);
  const [name, setName] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: ask our server (server/index.js) to create a PaymentIntent for this amount.
  async function handleContinue(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json().catch(() => ({})); // empty body if the server is down

      if (!res.ok || !data.clientSecret) {
        throw new Error(data.error || "Could not reach the payment server. Is `npm run server` running?");
      }
      setClientSecret(data.clientSecret);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
    setLoading(false);
  }

  return (
    <main>
      <section>
        <div className="wrap">
          <h1>Donate</h1>
          <p>Every peso goes to school supplies and small scholarships for students in Central Luzon.</p>

          {clientSecret ? (
            // key={clientSecret} gives Stripe a fresh form for each new PaymentIntent
            <Elements key={clientSecret} stripe={stripePromise} options={{ clientSecret }}>
              <PayForm amount={amount} name={name} onBack={() => setClientSecret("")} />
            </Elements>
          ) : (
            <form className="card donate-form" onSubmit={handleContinue}>
              <h3>Choose an amount</h3>
              <div className="amounts">
                {amounts.map((a) => (
                  <button
                    type="button"
                    key={a}
                    className={a === amount ? "pill selected" : "pill"}
                    onClick={() => setAmount(a)}
                  >
                    ₱{a}
                  </button>
                ))}
              </div>

              <label htmlFor="name">Name on card</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />

              <button className="btn" type="submit" disabled={loading} style={{ marginTop: "1.25rem" }}>
                {loading ? "Please wait..." : `Continue to payment (₱${amount})`}
              </button>
              {message && <p role="alert">{message}</p>}
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default Donate;
