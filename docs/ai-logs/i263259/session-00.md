# AI Session Log — Session 00

- **Date:** 2026-11-26
- **Repository:** `SE-E_Group09_GamingHub`
- **Conversation ID:** `e7ed66ca-ef0b-4990-8d94-bb495e8b74d7`
- **Model:** Gemini 4 Hydrogen (High)
- **Files Created:** `style.css`, `script.js`, `index.html`, `trending.html`, `gta6.html`

---

## 1. User Request

> Build a clean, simple, dark-themed Gaming Hub multi-page website using semantic HTML, a shared style.css, and vanilla JavaScript. Keep the design streamlined and uncluttered—do NOT include an "explore the site" directory or links to every subpage on the homepage. Establish a cohesive dark gaming visual theme (dark slate/charcoal background, crisp card borders, clean typography, and accent highlights) that other group members can easily follow for their own pages.
>
> Create these core files first:
> 1. style.css: Shared dark-mode styling, clean layout containers, card grids, buttons, and simple navigation/footer styles.
> 2. index.html: Keep it focused and minimal. Feature a GTA 6 highlight section/card (linking to gta6.html) and a 4-card showcase of the Top 4 games (with a link to trending.html). No extra site-map clutter or full directory of all pages.
> 3. trending.html: Display the Top 4 trending games cleanly with clear stats/details and a simple interactive feature (such as a watchlist toggle or filter) without unnecessary bloat.
> 4. gta6.html: A dedicated GTA 6 page with key details, release/platform highlights, and a clean return link back to index.html or trending.html.
>
> Keep the HTML, CSS, and JS simple, readable, and easy to maintain.

---

## 2. Files Inspected

- Workspace root (`Get-ChildItem -Force`) — Confirmed the repository initially contained only `.git` and `README.md`.
- `README.md` — Read to check for any existing project notes (`# SE-E_Group09_GamingHub`).

---

## 3. Changes Made

### `style.css`
- Defined shared CSS custom properties (`--bg-page`, `--bg-surface`, `--bg-card`, `--bg-card-hover`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent`, `--accent-gta`, `--success`, `--border-subtle`, `--border-strong`) for a cohesive dark-slate gaming theme.
- Styled semantic layout containers (`.container`, `.section`, `.section-header`), sticky `.site-header` and `.nav-links` (with `aria-current="page"` highlighting), `.spotlight` hero section, `.meta-panel`, `.card-grid` (4-column) and `.card-grid-2` (2-column) responsive grids, `.card`, `.stat-list`, `.badge` variants, `.btn` variants, `.toolbar` / `.filter-btn`, and `.site-footer`.

### `script.js`
- Created a self-contained vanilla JavaScript module running on `DOMContentLoaded`:
  - `initWatchlist()` using `localStorage` (`"gamingHubWatchlist"`) to toggle `[data-watchlist-id]` buttons, update `aria-pressed` and button labels (`"+ Watchlist"` / `"In Watchlist"`), and update `#watchlist-count`.
  - `initGenreFilter()` handling `[data-filter]` buttons (`all`, `rpg`, `shooter`) against `[data-category]` cards by toggling `.is-hidden`, updating `aria-pressed`, and toggling `#filter-empty` when `visibleCount === 0`.

### `index.html`
- Built a minimal semantic homepage (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) with navigation links to `Home`, `Trending`, and `GTA 6` (without an "explore the site" directory).
- Added a **Grand Theft Auto VI** `.spotlight` section linking to `gta6.html` and `trending.html`, alongside a quick-facts `.meta-panel`.
- Added a **Top 4 Games** 4-card `.card-grid` showcasing *Monster Hunter Wilds*, *Marvel Rivals*, *Baldur's Gate 3*, and *Counter-Strike 2* with a link to `trending.html`.

### `trending.html`
- Built the **Top 4 Trending Games** page in a `.card-grid-2` layout with player counts, community scores, and platform stats.
- Added a `.toolbar` with genre filter buttons (`All (4)`, `RPG`, `Shooter`), a live watchlist counter (`#watchlist-count`), and per-card `+ Watchlist` toggle buttons wired to `script.js`.

### `gta6.html`
- Built the dedicated **Grand Theft Auto VI** page with a hero `.spotlight`, release/platform/setting/protagonist `.meta-panel`, a `+ Watchlist` toggle (`data-watchlist-id="gta-6"`), four Key Highlights cards (*Leonida & Vice City*, *Dual-Protagonist Narrative*, *Current-Gen Console Focus*, *Living Open-World Simulation*), and return links to `index.html` and `trending.html`.

---

## 4. Verification

- `Get-ChildItem -Name`: Confirmed all five files (`style.css`, `script.js`, `index.html`, `trending.html`, `gta6.html`) were created in `D:\SE-E_Group09_GamingHub`.
- `Select-String -Path index.html,trending.html,gta6.html -Pattern 'href=|src='`: Verified all internal `href` and `src` references resolve to the created project files.
- `node --check script.js`: Failed because `node` is not installed in the workspace environment; browser runtime behavior was not executed in-terminal.

---

## 5. Quick Walkthrough (How the JS Works)

1. **`loadWatchlist()` / `saveWatchlist(list)`**: Read and write the JSON array stored under `"gamingHubWatchlist"` in `localStorage` inside `try`/`catch` blocks.
2. **`initWatchlist()`**: Queries `[data-watchlist-id]` buttons and `#watchlist-count`, binds click listeners to add/remove IDs, persists changes, and runs `syncUI()` to keep `aria-pressed`, button labels, and the saved count in sync.
3. **`initGenreFilter()`**: Queries `[data-filter]` buttons and `[data-category]` cards; on click, `applyFilter(selected)` hides non-matching cards using `.is-hidden`, updates `aria-pressed` on filter buttons, and shows `#filter-empty` if no cards remain visible.
