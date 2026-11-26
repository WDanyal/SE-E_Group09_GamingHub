/**
 * Gaming Hub - Shared Interactive Controls
 * Handles genre filtering (trending.html) and persistent watchlist toggles.
 */

(function () {
  const WATCHLIST_KEY = "gamingHubWatchlist";

  function loadWatchlist() {
    try {
      const saved = localStorage.getItem(WATCHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  function saveWatchlist(list) {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
    } catch {
      // Ignore storage failures in restricted browsing modes
    }
  }

  function initWatchlist() {
    const buttons = document.querySelectorAll("[data-watchlist-id]");
    const countEl = document.getElementById("watchlist-count");
    let watchlist = loadWatchlist();

    function syncUI() {
      buttons.forEach((btn) => {
        const id = btn.dataset.watchlistId;
        const active = watchlist.includes(id);
        btn.setAttribute("aria-pressed", String(active));
        btn.textContent = active ? "In Watchlist" : "+ Watchlist";
      });

      if (countEl) {
        countEl.textContent = String(watchlist.length);
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.watchlistId;
        if (!id) return;

        if (watchlist.includes(id)) {
          watchlist = watchlist.filter((item) => item !== id);
        } else {
          watchlist.push(id);
        }

        saveWatchlist(watchlist);
        syncUI();
      });
    });

    syncUI();
  }

  function initGenreFilter() {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const gameCards = document.querySelectorAll("[data-category]");
    const emptyState = document.getElementById("filter-empty");

    if (!filterButtons.length || !gameCards.length) return;

    function applyFilter(selected) {
      let visibleCount = 0;

      gameCards.forEach((card) => {
        const category = card.dataset.category;
        const matches = selected === "all" || category === selected;
        card.classList.toggle("is-hidden", !matches);
        if (matches) visibleCount += 1;
      });

      filterButtons.forEach((btn) => {
        const active = btn.dataset.filter === selected;
        btn.setAttribute("aria-pressed", String(active));
      });

      if (emptyState) {
        emptyState.classList.toggle("is-hidden", visibleCount > 0);
      }
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        applyFilter(btn.dataset.filter || "all");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initWatchlist();
    initGenreFilter();
  });
})();
