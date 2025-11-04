# FlightMade — Empty Leg Private Jet Marketplace (MVP)

FlightMade is a luxury private jet empty-leg marketplace that aggregates live empty-leg flights and surfaces them in a simple, high-end web interface.

This repository contains the Next.js frontend (flightmade-client) and Prisma schema for the backend models used by the inquiry flow.

Quick start (macOS)

1. Clone repo
   git clone <repo-url> && cd Epiconegrowth

2. Copy environment file
   cp .env.example .env
   Fill values (DATABASE_URL, EMAIL_API_KEY, etc.).

3. Install frontend deps and run
   cd flightmade-client
   npm install
   npm run dev
   Open http://localhost:3000

4. Prisma (if using DB)
   # from project root
   cd flightmade-client
   npx prisma generate
   npx prisma migrate dev --name init

Notes

- Ensure you choose App Router (src/app) or Pages Router (src/pages) for root-only routes. Keep one root page to avoid conflicts.
- The /api/inquiries endpoint saves inquiries to the DB (Prisma). Configure EMAIL provider separately to send notifications.
- Prices are numbers in code (no currency symbol). Formatting happens in UI.

Files added/updated:

- flightmade-client/src/pages/flights.tsx (prices as numbers, booking submission)
- flightmade-client/src/components/FlightCard.tsx (expects number price, onBook)
- flightmade-client/src/pages/api/inquiries.ts (POST endpoint to store inquiry)
- README.md
- .env.example
- .gitignore
