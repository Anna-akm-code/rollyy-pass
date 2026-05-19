# Rollyy Pass — Tap & Go

A demo prototype of the Rollyy EV charging wallet app. One pass, one balance, works everywhere.

Live demo: https://rollyy-pass.vercel.app/scan

## What is this?

This is a working demo of the Rollyy Pass user experience — from scanning a QR code at a charging station, to calling an autonomous charging robot, to starting a session and viewing transaction history.

Built for the Rollyy Vibe Coding hackathon challenge.


## Run it locally

You need Node.js (v18 or newer). Then:

```
git clone https://github.com/anna-akm-code/rollyy-pass.git
cd rollyy-pass
npm install
npm run dev
```

Open http://localhost:5173 in your browser. For the best experience, use mobile view (F12 → toggle device toolbar → pick any phone).

## User flow

1. **Scan QR** — simulated QR scan detects a charging station
2. **Add card** — enter payment details (mock, no real charges)
3. **Call robot** — autonomous charging robot dispatched to your vehicle
4. **Start charging** — swipe to begin, with time estimates and cost preview
5. **Stop charging** — live session with real-time energy, duration, and cost
6. **Thank you** — session summary and receipt
7. **History** — all transactions in one unified feed

## Tech stack

React + TypeScript + Vite + Tailwind CSS + React Router


