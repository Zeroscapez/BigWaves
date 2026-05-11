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

## Legal

This is an unofficial fan project and is not affiliated with, endorsed by, or sponsored by Capcom Co., Ltd. or any of its subsidiaries or affiliates.

Mega Man Star Force, Mega Man, and all related characters, names, logos, and assets are trademarks and copyrights of **Capcom Co., Ltd.** All rights reserved.

Card data sourced from the [Mega Man Knowledge Base (MMKB)](https://megaman.fandom.com/), a fan wiki. All game content, card names, descriptions, and artwork belong to their respective copyright holders.

This project does not distribute, reproduce, or claim ownership of any copyrighted game assets. Cover art images (if included locally) are used for non-commercial fan purposes only and remain the property of Capcom Co., Ltd.

This project is released for personal, non-commercial use only. No part of this project may be used for commercial purposes.

## Disclaimer

This project is a fan tool created out of love for the Mega Man Star Force series. If you enjoy the tracker, please support the official games and Capcom.
