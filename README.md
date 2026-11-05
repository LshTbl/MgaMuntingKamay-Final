# Mga Munting Kamay

A non-profit website built with Vite + React + TypeScript and react-router-dom.
Pages: Home (about the non-profit), About (driven by `src/data/about.json`), and Donate (Stripe payment, test mode).

## Run it locally

1. Install packages:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and paste your Stripe **test** keys
   (Stripe Dashboard → turn on Test mode → Developers → API keys):
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
   Never put `VITE_` in front of the secret key, and never commit `.env`.
3. Terminal 1 starts the payment server (port 4242):
   ```
   npm run server
   ```
4. Terminal 2 starts the website (port 5173):
   ```
   npm run dev
   ```
5. Open http://localhost:5173 and go to Donate.

## Stripe test cards

| Result  | Card number         | Expiry      | CVC | ZIP   |
|---------|---------------------|-------------|-----|-------|
| Success | 4242 4242 4242 4242 | 12/34       | 123 | 12345 |
| Decline | 4000 0000 0000 0002 | 12/34       | 123 | 12345 |

## How the payment works

1. Donate page sends the amount to `POST /api/create-payment-intent` (Vite forwards `/api` to port 4242).
2. `server/index.js` creates a PaymentIntent with the secret key and returns its `clientSecret`.
3. The page shows Stripe's `PaymentElement` and calls `stripe.confirmPayment({ redirect: "if_required" })`.
4. On success, a thank-you message is shown and the payment appears in the Stripe dashboard (Payments, test mode).

The currency is set in one line in `server/index.js` (`const CURRENCY = "php"`).
