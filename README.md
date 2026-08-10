# BIG WAVES

A fan-made web application for tracking Mega Man Star Force battlecard collections across all three games.

## Overview

Star Force Battlecard Tracker lets you browse battlecards, track which ones you've obtained, find enemy locations, and monitor your collection progress — all saved locally in your browser.

## Features

- Browse battlecards for each game version
- Filter by element, card class, and obtained status
- Search by English or Japanese card name
- Track obtained cards with progress bars per game
- Data persists across sessions via localStorage

## Current Coverage

- Mega Man Star Force 3: Black Ace
- Mega Man Star Force 3: Red Joker

SF1 and SF2 support coming soon.

## Tech Stack

- React 18
- Vite
- React Router v6
- CSS Modules

## Getting Started

```bash
npm install
npm run dev
```

## Deploying to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to vercel.com → New Project
3. Import your repo
4. Framework Preset: Vite
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click Deploy

The repo includes a `vercel.json` with an SPA rewrite rule so client-side routes (e.g. `/cards/sf3-black-ace`) resolve correctly instead of 404ing on a direct load or refresh.

## Self-Hosting (non-Vercel)

This is a static single-page app — `npm run build` produces a `dist/` folder that can be served by any static host (Netlify, GitHub Pages, nginx, Apache, S3 + CloudFront, etc.).

```bash
npm install
npm run build
# serve the dist/ folder with any static file server
```

Two things any host needs to get right, since the app is a client-side-routed SPA built with React Router:

1. **SPA fallback rewrite.** Unknown paths must serve `index.html` (not a 404) so React Router can take over client-side. `vercel.json` shows the rule for Vercel; the equivalent for nginx is `try_files $uri /index.html;`, for Netlify a `_redirects` file with `/* /index.html 200`, and for Apache a `.htaccess` rewrite to `index.html`.
2. **Asset size.** `public/assets/` (card + cover art) is currently ~790MB. Make sure your host's storage/bandwidth plan accounts for that before deploying.

No environment variables or backend/database are required — everything (including obtained-card tracking) runs client-side via `localStorage`.

## Adding Cards

Card data lives in `src/data/cards/`. Each file exports an array of card objects following this shape:

```js
{
  id: 'sf3ba-001-card-name',
  name: 'Card Name',
  nameJP: 'カード名',
  types: ['Null'],
  cardClass: 'STANDARD',
  damage: 100,
  upgrades: [10, 20, 30, 40, 50, 60],
  description: 'Card effect description.',
  locations: [],
  obtained: false,
  image: null,
}
```

## Collaboration Notes

A few conventions to know before contributing:

- **Run `npm run lint` before committing.** The project is kept at zero ESLint errors/warnings; fix or justify (with a targeted `eslint-disable` comment and a reason) rather than leaving new ones.
- **Card/cover art goes in `public/assets/`, referenced by root-relative path.** Images must live under `public/assets/battlecardart/...` or `public/assets/coverart/...` and be referenced as `/assets/battlecardart/...png` (not `src/assets/...`). Vite only bundles `public/` into the production build — a path into `src/assets` will load fine in `npm run dev` but 404 after `npm run build`, since Vite's dev server serves `src/` directly but doesn't carry raw string-referenced files in `src/` into `dist/`.
- **Card data lives in `src/data/cards/`** — see the "Adding Cards" section above for the object shape. Keep new entries consistent with the existing `id` naming convention (`sf3-###-slug` for base cards, prefixed per-version at import time).
- **Branch off `main` and open a PR** for non-trivial changes; small fixes are fine to push directly if you're the sole maintainer at the time.
- **No backend/build secrets to manage** — the app is entirely static/client-side, so there's no `.env` setup required to run or deploy it.

## Legal

This is an unofficial fan project and is not affiliated with, endorsed by, or sponsored by Capcom Co., Ltd. or any of its subsidiaries or affiliates.

Mega Man Star Force, Mega Man, and all related characters, names, logos, and assets are trademarks and copyrights of **Capcom Co., Ltd.** All rights reserved.

Card data sourced from the [Mega Man Knowledge Base (MMKB)](https://megaman.fandom.com/), a fan wiki. All game content, card names, descriptions, and artwork belong to their respective copyright holders.

This project does not distribute, reproduce, or claim ownership of any copyrighted game assets. Cover art images (if included locally) are used for non-commercial fan purposes only and remain the property of Capcom Co., Ltd.

This project is released for personal, non-commercial use only. No part of this project may be used for commercial purposes.

## Disclaimer

This project is a fan tool created out of love for the Mega Man Star Force series. If you enjoy the tracker, please support the official games and Capcom.
