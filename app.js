/* ==========================================================================
   Gaming Hub — Shared Data & Interactive Logic (Vanilla JS)
   ========================================================================== */

(function () {
  "use strict";

  const GAMES = [
    {
      id: "ashfall-protocol",
      title: "Ashfall Protocol",
      genre: "Action RPG",
      developer: "Ironveil Studio",
      year: 2026,
      platforms: ["PC", "PS5", "Xbox Series X"],
      price: "$59.99",
      playtime: "38 hrs",
      fpsTarget: "60 / 120 FPS",
      scores: { gameplay: 9.3, visuals: 9.0, performance: 8.8 },
      verdict:
        "Tight parry-driven combat and layered build crafting elevate a moody sci-fi frontier.",
      pros: [
        "Responsive melee & kinetic weapon flow",
        "Meaningful boss phases with fair telegraphs",
        "Crisp HDR lighting and clean HUD"
      ],
      cons: [
        "Mid-game crafting mats feel scarce",
        "Minimal co-op matchmaking filters"
      ]
    },
    {
      id: "starlight-circuit",
      title: "Starlight Circuit",
      genre: "Racing",
      developer: "Apex Grid",
      year: 2025,
      platforms: ["PC", "PS5", "Steam Deck"],
      price: "$49.99",
      playtime: "24 hrs",
      fpsTarget: "120 FPS",
      scores: { gameplay: 8.9, visuals: 9.2, performance: 9.5 },
      verdict:
        "Silky frame pacing and tactile tire physics make every night-rain lap thrilling.",
      pros: [
        "Rock-solid 120 FPS performance mode",
        "Dynamic wet-track grip shifts",
        "Zero microtransaction clutter"
      ],
      cons: [
        "Career narration is forgettable",
        "Small rally track roster at launch"
      ]
    },
    {
      id: "hollow-bastion",
      title: "Hollow Bastion IX",
      genre: "Strategy",
      developer: "Cinderworks",
      year: 2026,
      platforms: ["PC", "Steam Deck"],
      price: "$39.99",
      playtime: "52 hrs",
      fpsTarget: "60 FPS",
      scores: { gameplay: 9.4, visuals: 8.2, performance: 8.9 },
      verdict:
        "Smart turn-based squad tactics where terrain elevation and supply lines decide battles.",
      pros: [
        "Deep tactical synergy across 9 classes",
        "Readable isometric battlefield UI",
        "Full Steam Deck controller support"
      ],
      cons: [
        "Steep onboarding in first two chapters",
        "Modest cutscene animation budget"
      ]
    },
    {
      id: "neon-drift-zero",
      title: "Neon Drift Zero",
      genre: "Indie",
      developer: "Kestrel Lab",
      year: 2025,
      platforms: ["PC", "PS5", "Steam Deck"],
      price: "$24.99",
      playtime: "16 hrs",
      fpsTarget: "60 / 120 FPS",
      scores: { gameplay: 9.0, visuals: 8.7, performance: 9.3 },
      verdict:
        "A razor-sharp precision platformer with instant restarts and an infectious synth pulse.",
      pros: [
        "Zero-latency movement and grapple physics",
        "Sub-second respawn keeps momentum alive",
        "Great value for price"
      ],
      cons: [
        "Final chapter difficulty spikes sharply",
        "Short campaign length"
      ]
    },
    {
      id: "iron-horizon",
      title: "Iron Horizon",
      genre: "Shooter",
      developer: "Vanguard Nine",
      year: 2025,
      platforms: ["PC", "PS5", "Xbox Series X"],
      price: "$69.99",
      playtime: "30 hrs",
      fpsTarget: "120 FPS",
      scores: { gameplay: 8.6, visuals: 8.8, performance: 8.1 },
      verdict:
        "Punchy gunplay and destructible arenas shine, held back slightly by heavy shader load.",
      pros: [
        "Best-in-class weapon audio and recoil feel",
        "Balanced 5v5 competitive map layouts",
        "Cross-progression works seamlessly"
      ],
      cons: [
        "Occasional shader stutter on PC",
        "Battle pass progression feels slow"
      ]
    },
    {
      id: "echoes-of-mire",
      title: "Echoes of Mire",
      genre: "Survival",
      developer: "Blackfern Interactive",
      year: 2024,
      platforms: ["PC", "PS5", "Xbox Series X"],
      price: "$44.99",
      playtime: "22 hrs",
      fpsTarget: "60 FPS",
      scores: { gameplay: 8.1, visuals: 8.9, performance: 7.7 },
      verdict:
        "Oppressive atmosphere and clever sound design deliver memorable tension despite uneven pacing.",
      pros: [
        "Standout volumetric fog and flashlight physics",
        "Resource scarcity creates genuine dread",
        "Strong environmental storytelling"
      ],
      cons: [
        "Frame dips in dense swamp zones",
        "Backtracking slows the third act"
      ]
    },
    {
      id: "verdant-odyssey",
      title: "Verdant Odyssey",
      genre: "Action RPG",
      developer: "Solstice Guild",
      year: 2025,
      platforms: ["PC", "PS5", "Steam Deck"],
      price: "$59.99",
      playtime: "45 hrs",
      fpsTarget: "60 FPS",
      scores: { gameplay: 8.8, visuals: 9.1, performance: 8.6 },
      verdict:
        "An inviting open-world adventure that rewards curiosity over checklist icons.",
      pros: [
        "Organic exploration without map clutter",
        "Flexible elemental spell combinations",
        "Clean photo mode and minimal HUD"
      ],
      cons: [
        "Inventory sorting lacks quick presets",
        "Companion AI occasionally stalls"
      ]
    },
    {
      id: "voidline-command",
      title: "Voidline Command",
      genre: "Strategy",
      developer: "Northstar Systems",
      year: 2024,
      platforms: ["PC", "Xbox Series X"],
      price: "$34.99",
      playtime: "40 hrs",
      fpsTarget: "60 FPS",
      scores: { gameplay: 8.4, visuals: 7.9, performance: 8.7 },
      verdict:
        "Crisp fleet logistics and readable real-time pause combat built for long campaigns.",
      pros: [
        "Clear tactical overlays at any zoom level",
        "Smart AI flanking behavior",
        "Fast save/load turnaround"
      ],
      cons: [
        "Muted ship textures up close",
        "Limited skirmish map editor tools"
      ]
    }
  ];

  const PLATFORMS = [
    {
      id: "pc-rig",
      title: "Custom Gaming PC (Mid-High)",
      category: "Desktop",
      year: 2026,
      price: "$1,450",
      resolution: "1440p / 4K Native",
      fpsTarget: "120–240 FPS",
      storage: "2 TB NVMe Gen4",
      portability: "Stationary",
      scores: { performance: 9.6, value: 8.1, library: 9.8 },
      bestFor: "High refresh competitive play, mods, and ultrawide setups.",
      summary: "Unmatched flexibility, upgrade path, and frame-rate ceiling."
    },
    {
      id: "ps5",
      title: "PlayStation 5",
      category: "Home Console",
      year: 2020,
      price: "$499",
      resolution: "4K Dynamic / 1440p",
      fpsTarget: "60 / 120 FPS",
      storage: "1 TB Custom SSD",
      portability: "Living Room",
      scores: { performance: 8.8, value: 9.1, library: 9.2 },
      bestFor: "Plug-and-play single-player blockbusters and DualSense haptics.",
      summary: "Balanced couch gaming with fast SSD loads and strong exclusives."
    },
    {
      id: "xbox-series-x",
      title: "Xbox Series X",
      category: "Home Console",
      year: 2020,
      price: "$499",
      resolution: "4K Native / Dynamic",
      fpsTarget: "60 / 120 FPS",
      storage: "1 TB NVMe SSD",
      portability: "Living Room",
      scores: { performance: 8.9, value: 9.0, library: 8.7 },
      bestFor: "Quick Resume multi-game switching and subscription value.",
      summary: "Quiet thermal design with strong backward compatibility."
    },
    {
      id: "steam-deck-oled",
      title: "Steam Deck OLED",
      category: "Handheld PC",
      year: 2023,
      price: "$549",
      resolution: "800p HDR OLED",
      fpsTarget: "45 / 90 FPS",
      storage: "512 GB NVMe SSD",
      portability: "Portable",
      scores: { performance: 7.9, value: 9.3, library: 9.4 },
      bestFor: "Indie hits, strategy games, and travel sessions on an OLED screen.",
      summary: "Best-in-class handheld ergonomics and seamless Steam library access."
    }
  ];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getOverallScore(scores) {
    const values = Object.values(scores);
    const total = values.reduce((sum, n) => sum + n, 0);
    return Number((total / values.length).toFixed(1));
  }

  function getTier(score) {
    if (score >= 9.0) return { label: "Essential", className: "tier-high" };
    if (score >= 8.5) return { label: "Great", className: "tier-mid" };
    return { label: "Solid", className: "tier-solid" };
  }

  function getUniqueGenres() {
    return ["All", ...new Set(GAMES.map((g) => g.genre))];
  }

  function getUniquePlatforms() {
    const all = GAMES.flatMap((g) => g.platforms);
    return ["All", ...new Set(all)];
  }

  function setupNavigation() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-links]");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* ------------------------------------------------------------------------
     Home Page
     ------------------------------------------------------------------------ */
  function initHomePage() {
    const picksContainer = document.getElementById("home-featured-reviews");
    const ratingsContainer = document.getElementById("home-top-ratings");
    const statsTotalGames = document.getElementById("stat-games-count");
    const statsAvgScore = document.getElementById("stat-avg-score");

    if (statsTotalGames) {
      statsTotalGames.textContent = String(GAMES.length);
    }

    if (statsAvgScore) {
      const avg =
        GAMES.reduce((acc, g) => acc + getOverallScore(g.scores), 0) /
        GAMES.length;
      statsAvgScore.textContent = avg.toFixed(1);
    }

    const sortedByScore = [...GAMES].sort(
      (a, b) => getOverallScore(b.scores) - getOverallScore(a.scores)
    );

    if (picksContainer) {
      picksContainer.innerHTML = sortedByScore
        .slice(0, 3)
        .map((game) => {
          const overall = getOverallScore(game.scores);
          const tier = getTier(overall);
          return `
            <article class="card">
              <div class="card-top">
                <div>
                  <h3 class="card-title">${escapeHtml(game.title)}</h3>
                  <p class="card-meta">${escapeHtml(game.genre)} &middot; ${game.year}</p>
                </div>
                <span class="score-badge tabular ${tier.className}">${overall.toFixed(1)}</span>
              </div>
              <p class="review-verdict">${escapeHtml(game.verdict)}</p>
              <div class="tag-row">
                ${game.platforms.map((p) => `<span class="tag">${escapeHtml(p)}</span>`).join("")}
              </div>
            </article>
          `;
        })
        .join("");
    }

    if (ratingsContainer) {
      ratingsContainer.innerHTML = sortedByScore
        .slice(0, 3)
        .map((game) => renderRatingCard(game))
        .join("");
    }
  }

  /* ------------------------------------------------------------------------
     Reviews Page
     ------------------------------------------------------------------------ */
  function initReviewsPage() {
    const genreContainer = document.getElementById("review-genre-filters");
    const platformSelect = document.getElementById("review-platform-select");
    const sortSelect = document.getElementById("review-sort-select");
    const searchInput = document.getElementById("review-search-input");
    const grid = document.getElementById("reviews-grid");
    const countLabel = document.getElementById("reviews-count");

    if (!grid) return;

    const state = {
      genre: "All",
      platform: "All",
      sort: "score-desc",
      query: ""
    };

    if (genreContainer) {
      genreContainer.innerHTML = getUniqueGenres()
        .map(
          (genre) => `
            <button
              type="button"
              class="pill-btn ${genre === "All" ? "is-active" : ""}"
              data-genre="${escapeHtml(genre)}"
            >${escapeHtml(genre)}</button>
          `
        )
        .join("");

      genreContainer.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-genre]");
        if (!btn) return;
        state.genre = btn.dataset.genre;
        genreContainer.querySelectorAll(".pill-btn").forEach((el) => {
          el.classList.toggle("is-active", el === btn);
        });
        renderReviews();
      });
    }

    if (platformSelect) {
      platformSelect.innerHTML = getUniquePlatforms()
        .map(
          (p) =>
            `<option value="${escapeHtml(p)}">${p === "All" ? "All Platforms" : escapeHtml(p)}</option>`
        )
        .join("");
      platformSelect.addEventListener("change", () => {
        state.platform = platformSelect.value;
        renderReviews();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        renderReviews();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        state.query = searchInput.value.trim().toLowerCase();
        renderReviews();
      });
    }

    function renderReviews() {
      let filtered = GAMES.filter((game) => {
        const matchesGenre = state.genre === "All" || game.genre === state.genre;
        const matchesPlatform =
          state.platform === "All" || game.platforms.includes(state.platform);
        const matchesQuery =
          !state.query ||
          game.title.toLowerCase().includes(state.query) ||
          game.verdict.toLowerCase().includes(state.query) ||
          game.genre.toLowerCase().includes(state.query);
        return matchesGenre && matchesPlatform && matchesQuery;
      });

      filtered.sort((a, b) => {
        if (state.sort === "year-desc") return b.year - a.year;
        if (state.sort === "title-asc") return a.title.localeCompare(b.title);
        return getOverallScore(b.scores) - getOverallScore(a.scores);
      });

      if (countLabel) {
        countLabel.textContent = `Showing ${filtered.length} of ${GAMES.length} reviews`;
      }

      if (filtered.length === 0) {
        grid.innerHTML = `<div class="empty-state">No reviews match your current filters. Try clearing your search or selecting All genres.</div>`;
        return;
      }

      grid.innerHTML = filtered
        .map((game) => {
          const overall = getOverallScore(game.scores);
          const tier = getTier(overall);
          return `
            <article class="card">
              <div class="card-top">
                <div>
                  <h2 class="card-title">${escapeHtml(game.title)}</h2>
                  <p class="card-meta">${escapeHtml(game.developer)} &middot; ${escapeHtml(game.genre)} &middot; ${game.year}</p>
                </div>
                <span class="score-badge tabular ${tier.className}" title="${tier.label}">${overall.toFixed(1)}</span>
              </div>

              <div class="tag-row">
                ${game.platforms.map((p) => `<span class="tag">${escapeHtml(p)}</span>`).join("")}
                <span class="tag">${escapeHtml(game.playtime)}</span>
              </div>

              <p class="review-verdict">${escapeHtml(game.verdict)}</p>

              <div class="pros-cons">
                <div>
                  <h3 class="pros-cons-title is-pro">Pros</h3>
                  <ul class="takeaway-list is-pro">
                    ${game.pros.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
                <div>
                  <h3 class="pros-cons-title is-con">Cons</h3>
                  <ul class="takeaway-list is-con">
                    ${game.cons.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
              </div>
            </article>
          `;
        })
        .join("");
    }

    renderReviews();
  }

  /* ------------------------------------------------------------------------
     Ratings Page
     ------------------------------------------------------------------------ */
  function renderRatingCard(game) {
    const overall = getOverallScore(game.scores);
    const tier = getTier(overall);
    const categories = [
      { label: "Gameplay", value: game.scores.gameplay },
      { label: "Visuals", value: game.scores.visuals },
      { label: "Performance", value: game.scores.performance }
    ];

    return `
      <article class="card">
        <div class="card-top">
          <div>
            <h2 class="card-title">${escapeHtml(game.title)}</h2>
            <p class="card-meta">${escapeHtml(game.genre)} &middot; ${game.year}</p>
          </div>
          <span class="score-badge tabular ${tier.className}">${overall.toFixed(1)}</span>
        </div>

        <div class="rating-bars">
          ${categories
            .map(
              (cat) => `
                <div class="rating-row">
                  <span class="rating-name">${cat.label}</span>
                  <div class="rating-track" aria-hidden="true">
                    <div
                      class="rating-fill ${cat.value >= 9 ? "is-high" : ""}"
                      style="width: ${(cat.value * 10).toFixed(0)}%"
                    ></div>
                  </div>
                  <span class="rating-num tabular">${cat.value.toFixed(1)}</span>
                </div>
              `
            )
            .join("")}
        </div>

        <div class="card-footer-note">
          <span>${tier.label} Tier</span>
          <span>${escapeHtml(game.fpsTarget)}</span>
        </div>
      </article>
    `;
  }

  function initRatingsPage() {
    const genreSelect = document.getElementById("ratings-genre-select");
    const minScoreSelect = document.getElementById("ratings-min-select");
    const sortSelect = document.getElementById("ratings-sort-select");
    const grid = document.getElementById("ratings-grid");
    const countLabel = document.getElementById("ratings-count");
    const avgGameplayEl = document.getElementById("avg-gameplay");
    const avgVisualsEl = document.getElementById("avg-visuals");
    const avgPerfEl = document.getElementById("avg-performance");

    if (!grid) return;

    const state = {
      genre: "All",
      minScore: 0,
      sort: "overall"
    };

    if (genreSelect) {
      genreSelect.innerHTML = getUniqueGenres()
        .map(
          (g) =>
            `<option value="${escapeHtml(g)}">${g === "All" ? "All Genres" : escapeHtml(g)}</option>`
        )
        .join("");
      genreSelect.addEventListener("change", () => {
        state.genre = genreSelect.value;
        renderRatings();
      });
    }

    if (minScoreSelect) {
      minScoreSelect.addEventListener("change", () => {
        state.minScore = Number(minScoreSelect.value) || 0;
        renderRatings();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        renderRatings();
      });
    }

    function renderRatings() {
      const filtered = GAMES.filter((game) => {
        const overall = getOverallScore(game.scores);
        const matchesGenre = state.genre === "All" || game.genre === state.genre;
        return matchesGenre && overall >= state.minScore;
      });

      filtered.sort((a, b) => {
        if (state.sort === "gameplay") return b.scores.gameplay - a.scores.gameplay;
        if (state.sort === "visuals") return b.scores.visuals - a.scores.visuals;
        if (state.sort === "performance") return b.scores.performance - a.scores.performance;
        return getOverallScore(b.scores) - getOverallScore(a.scores);
      });

      if (countLabel) {
        countLabel.textContent = `Showing ${filtered.length} rated ${filtered.length === 1 ? "title" : "titles"}`;
      }

      if (filtered.length > 0) {
        const avg = (key) =>
          (
            filtered.reduce((sum, g) => sum + g.scores[key], 0) / filtered.length
          ).toFixed(1);
        if (avgGameplayEl) avgGameplayEl.textContent = avg("gameplay");
        if (avgVisualsEl) avgVisualsEl.textContent = avg("visuals");
        if (avgPerfEl) avgPerfEl.textContent = avg("performance");
      } else {
        if (avgGameplayEl) avgGameplayEl.textContent = "—";
        if (avgVisualsEl) avgVisualsEl.textContent = "—";
        if (avgPerfEl) avgPerfEl.textContent = "—";
      }

      if (filtered.length === 0) {
        grid.innerHTML = `<div class="empty-state">No games meet this score threshold. Lower the minimum score or switch genres.</div>`;
        return;
      }

      grid.innerHTML = filtered.map((game) => renderRatingCard(game)).join("");
    }

    renderRatings();
  }

  /* ------------------------------------------------------------------------
     Compare Page
     ------------------------------------------------------------------------ */
  function initComparePage() {
    const modeButtons = document.querySelectorAll("[data-compare-mode]");
    const selectA = document.getElementById("compare-select-a");
    const selectB = document.getElementById("compare-select-b");
    const swapBtn = document.getElementById("compare-swap-btn");
    const cardsContainer = document.getElementById("compare-cards");
    const tableBody = document.getElementById("compare-table-body");
    const thA = document.getElementById("compare-th-a");
    const thB = document.getElementById("compare-th-b");

    if (!selectA || !selectB || !cardsContainer || !tableBody) return;

    const state = {
      mode: "games",
      idA: GAMES[0].id,
      idB: GAMES[1].id
    };

    function getDataset() {
      return state.mode === "games" ? GAMES : PLATFORMS;
    }

    function populateSelectors() {
      const items = getDataset();
      const optionsHtml = items
        .map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.title)}</option>`)
        .join("");
      selectA.innerHTML = optionsHtml;
      selectB.innerHTML = optionsHtml;
      selectA.value = state.idA;
      selectB.value = state.idB;
    }

    function buildRows(itemA, itemB) {
      if (state.mode === "games") {
        const overallA = getOverallScore(itemA.scores);
        const overallB = getOverallScore(itemB.scores);
        return [
          { label: "Genre", a: itemA.genre, b: itemB.genre },
          { label: "Developer", a: itemA.developer, b: itemB.developer },
          { label: "Release Year", a: itemA.year, b: itemB.year, numA: itemA.year, numB: itemB.year },
          { label: "Platforms", a: itemA.platforms.join(", "), b: itemB.platforms.join(", ") },
          { label: "Overall Score", a: overallA.toFixed(1), b: overallB.toFixed(1), numA: overallA, numB: overallB },
          { label: "Gameplay", a: itemA.scores.gameplay.toFixed(1), b: itemB.scores.gameplay.toFixed(1), numA: itemA.scores.gameplay, numB: itemB.scores.gameplay },
          { label: "Visuals", a: itemA.scores.visuals.toFixed(1), b: itemB.scores.visuals.toFixed(1), numA: itemA.scores.visuals, numB: itemB.scores.visuals },
          { label: "Performance", a: itemA.scores.performance.toFixed(1), b: itemB.scores.performance.toFixed(1), numA: itemA.scores.performance, numB: itemB.scores.performance },
          { label: "Frame Target", a: itemA.fpsTarget, b: itemB.fpsTarget },
          { label: "Avg. Playtime", a: itemA.playtime, b: itemB.playtime },
          { label: "Launch Price", a: itemA.price, b: itemB.price }
        ];
      }

      const overallA = getOverallScore(itemA.scores);
      const overallB = getOverallScore(itemB.scores);
      return [
        { label: "Category", a: itemA.category, b: itemB.category },
        { label: "Release Year", a: itemA.year, b: itemB.year, numA: itemA.year, numB: itemB.year },
        { label: "MSRP", a: itemA.price, b: itemB.price },
        { label: "Resolution", a: itemA.resolution, b: itemB.resolution },
        { label: "Frame Target", a: itemA.fpsTarget, b: itemB.fpsTarget },
        { label: "Storage", a: itemA.storage, b: itemB.storage },
        { label: "Form Factor", a: itemA.portability, b: itemB.portability },
        { label: "Overall Rating", a: overallA.toFixed(1), b: overallB.toFixed(1), numA: overallA, numB: overallB },
        { label: "Performance", a: itemA.scores.performance.toFixed(1), b: itemB.scores.performance.toFixed(1), numA: itemA.scores.performance, numB: itemB.scores.performance },
        { label: "Value", a: itemA.scores.value.toFixed(1), b: itemB.scores.value.toFixed(1), numA: itemA.scores.value, numB: itemB.scores.value },
        { label: "Library Access", a: itemA.scores.library.toFixed(1), b: itemB.scores.library.toFixed(1), numA: itemA.scores.library, numB: itemB.scores.library }
      ];
    }

    function renderCompareCard(item, slotLabel) {
      const overall = getOverallScore(item.scores);
      const tier = getTier(overall);
      const subtitle =
        state.mode === "games"
          ? `${item.genre} · ${item.developer}`
          : `${item.category} · ${item.price}`;
      const summary = state.mode === "games" ? item.verdict : item.bestFor;

      return `
        <article class="card">
          <span class="compare-slot-label">${slotLabel}</span>
          <div class="card-top">
            <div>
              <h2 class="card-title">${escapeHtml(item.title)}</h2>
              <p class="card-meta">${escapeHtml(subtitle)}</p>
            </div>
            <span class="score-badge tabular ${tier.className}">${overall.toFixed(1)}</span>
          </div>
          <p class="review-verdict">${escapeHtml(summary)}</p>
        </article>
      `;
    }

    function renderComparison() {
      const items = getDataset();
      const itemA = items.find((i) => i.id === state.idA) || items[0];
      const itemB = items.find((i) => i.id === state.idB) || items[1];

      cardsContainer.innerHTML =
        renderCompareCard(itemA, "Selection A") +
        renderCompareCard(itemB, "Selection B");

      if (thA) thA.textContent = itemA.title;
      if (thB) thB.textContent = itemB.title;

      const rows = buildRows(itemA, itemB);
      tableBody.innerHTML = rows
        .map((row) => {
          const hasNums = typeof row.numA === "number" && typeof row.numB === "number";
          const winA = hasNums && row.numA > row.numB ? "metric-winner" : "";
          const winB = hasNums && row.numB > row.numA ? "metric-winner" : "";

          return `
            <tr>
              <th scope="row">${escapeHtml(row.label)}</th>
              <td class="tabular ${winA}">${escapeHtml(row.a)}</td>
              <td class="tabular ${winB}">${escapeHtml(row.b)}</td>
            </tr>
          `;
        })
        .join("");
    }

    modeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextMode = btn.dataset.compareMode;
        if (nextMode === state.mode) return;
        state.mode = nextMode;
        const items = getDataset();
        state.idA = items[0].id;
        state.idB = items[1].id;

        modeButtons.forEach((b) =>
          b.classList.toggle("is-active", b.dataset.compareMode === state.mode)
        );
        populateSelectors();
        renderComparison();
      });
    });

    selectA.addEventListener("change", () => {
      state.idA = selectA.value;
      renderComparison();
    });

    selectB.addEventListener("change", () => {
      state.idB = selectB.value;
      renderComparison();
    });

    if (swapBtn) {
      swapBtn.addEventListener("click", () => {
        const prevA = state.idA;
        state.idA = state.idB;
        state.idB = prevA;
        selectA.value = state.idA;
        selectB.value = state.idB;
        renderComparison();
      });
    }

    populateSelectors();
    renderComparison();
  }

  /* ------------------------------------------------------------------------
     Bootstrap
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    const page = document.body.dataset.page;
    if (page === "home") initHomePage();
    if (page === "reviews") initReviewsPage();
    if (page === "ratings") initRatingsPage();
    if (page === "compare") initComparePage();
  });
})();
