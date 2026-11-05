# MgaMuntingKamay-Final

**Mga Munting Kamay** ("little hands") is a website for a non-profit that gives school supplies, small scholarships, and Bible study corners to public school students in Angeles City, Pampanga.

Built with **React + TypeScript + Vite**, with a working **Stripe** donation page (test mode).

## Pages

| Page | What it shows |
|---|---|
| **Home** | Mission, programs, what each donation buys, school year goal, where we serve, FAQ |
| **About** | About the developer, loaded from `src/data/about.json` |
| **Donate** | Card donation through Stripe (₱100, ₱250, ₱500, ₱1,000) |

## Tech Stack

- **React + TypeScript**: UI components with type checking
- **Vite**: development server and production build
- **react-router-dom**: page navigation (Home, About, Donate)
- **Express**: small backend server for payments
- **Stripe** (`stripe`, `@stripe/react-stripe-js`, `@stripe/stripe-js`): payment processing
- **dotenv**: loads API keys from `.env`

## Project Structure

```
├── server/index.js        # Express server: creates Stripe PaymentIntents
├── src/
│   ├── main.tsx           # App entry point
│   ├── App.tsx            # Routes + Navbar + Footer
│   ├── components/        # Navbar.tsx, Footer.tsx
│   ├── pages/             # Home.tsx, About.tsx, Donate.tsx
│   ├── data/about.json    # About page content
│   ├── assets/            # Images
│   └── index.css          # Theme (colors, layout, dark mode)
├── .env.example           # Template for API keys
└── vite.config.ts         # Proxies /api to the Express server
```

## Getting Started

### 1. Install dependencies
```
npm install
```

### 2. Add your Stripe test keys
Copy `.env.example` to `.env`, then paste your keys from the Stripe Dashboard
(**Sandbox / Test mode → Developers → API keys**):

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

> ⚠️ Never add `VITE_` to the secret key, and never commit `.env`.

### 3. Run the app (two terminals)

**Terminal 1: payment server (port 4242)**
```
npm run server
```

**Terminal 2: website (port 5173)**
```
npm run dev
```

Open **http://localhost:5173**

## Test Cards

| Result | Card number | Expiry | CVC | ZIP |
|---|---|---|---|---|
| ✅ Success | 4242 4242 4242 4242 | 12/34 | 123 | 12345 |
| ❌ Declined | 4000 0000 0000 0002 | 12/34 | 123 | 12345 |

No real money is charged in test mode.

## How the Payment Works

1. The donor picks an amount and clicks **Continue to payment**.
2. The site sends the amount to `POST /api/create-payment-intent` (Vite forwards it to port 4242).
3. The server uses the **secret key** to create a Stripe **PaymentIntent** and returns its `clientSecret`.
4. The page shows Stripe's **PaymentElement** card form.
5. Clicking **Pay** runs `stripe.confirmPayment({ redirect: "if_required" })`.
6. The page shows a thank-you message on success, or the error message if the card is declined.
7. The payment appears in the Stripe Dashboard under **Transactions**.

Card details go directly to Stripe and are never stored by this site.

## Security Notes

- The **publishable key** (`pk_test_`) is used in the browser and is safe to expose.
- The **secret key** (`sk_test_`) is used only by `server/index.js` and stays private.
- `.env` and `node_modules` are listed in `.gitignore` and are not uploaded to GitHub.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the website |
| `npm run server` | Start the payment server |
| `npm run build` | Build for production |
| `npm run lint` | Check code with ESLint |

## Author

**Elisha N. Tabual**, BSIT-3B
Angeles University Foundation
