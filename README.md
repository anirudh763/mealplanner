# The Kitchen Ledger 🍽️

A full weekly meal planner: plan meals, auto-generate a grocery list, and track nutrition — built as a receipt-style "kitchen ledger." All data is stored locally in your browser (`localStorage`), so there's no backend or database to set up.

## Features

- **Planner** — a 7-day × 3-meal grid. Assign recipes to any slot from a dropdown.
- **Recipes** — browse/search a starter set of 10 recipes, or add your own (name, macros, ingredients).
- **Grocery List** — a receipt-style list auto-generated from whatever's planned for the current week, aggregated and grouped by aisle, with tap-to-check items.
- **Nutrition** — a per-day ledger of calories/protein/carbs/fat for the current week, with a weekly average.

## Tech stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- No backend — state persists to `localStorage` in the browser

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # to preview the production build locally
```

## Project structure

```
src/
  components/     # Planner, Recipes, GroceryList, Nutrition, TabNav, WeekNav
  data/           # sample recipe dataset
  lib/            # date helpers + localStorage persistence hook
  App.jsx         # tab navigation + shared state
  index.css       # Tailwind + design system (the "ledger" look)
```

## Ideas for extending it

- Swap `localStorage` for a real backend (Supabase, Firebase, or your own API) to sync across devices.
- Add drag-and-drop for moving meals between days.
- Add a "servings scale" so ingredient quantities adjust automatically.
- Add nutrition goals/targets and show progress against them.
- Export the grocery list as a shareable link or PDF.

## Deploying

This is a static site after `npm run build` (output in `dist/`) — it deploys as-is to Vercel, Netlify, GitHub Pages, or Cloudflare Pages.
