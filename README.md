# UUID Studio

A polished, local-first UUID (Version 4) generator built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons.

## Features

- ✨ **Batch generation**: Generate 1-100 UUIDs in a single action with quick-pick presets.
- 🔐 **Secure UUID v4 logic**: Uses `crypto.randomUUID()` when available, with the `uuid` package as a fallback.
- 🧭 **Local-first history**: Keeps the latest 100 generated UUIDs in browser local storage.
- 🔎 **Searchable results**: Filter UUID history with or without hyphens.
- 🎛️ **Formatting controls**: Toggle uppercase output and canonical hyphen grouping without regenerating IDs.
- 📋 **Copy workflows**: Copy an individual UUID or every currently visible result.
- 🎨 **Responsive UI**: Gradient hero, sticky controls, live preview, dark-mode-aware styling, and animated result cards.

## Getting Started

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Quality Checks

```bash
npm run lint
npm run build
```

## Usage

1. Choose a quantity or enter any value from 1 to 100.
2. Toggle uppercase or hyphen formatting if desired.
3. Click **Generate** to prepend new UUIDs to the local history.
4. Search the history, copy individual UUIDs, copy all visible results, or clear the list.
