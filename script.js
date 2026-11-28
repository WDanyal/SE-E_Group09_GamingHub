/**
 * Gaming Hub - Shared Interactive Controls
 * Handles genre filtering, search (trending.html), and persistent state.
 */

(function () {
  const WATCHLIST_KEY = "gamingHubWatchlist";
  const FILTER_KEY = "gamingHubSelectedFilter";

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

  function loadSavedFilter() {
    try {
      return localStorage.getItem(FILTER_KEY) || "all";
    } catch {
      return "all";
    }
  }

  function saveFilter(filter) {
    try {
      localStorage.setItem(FILTER_KEY, filter);
    } catch {
      // Ignore storage failures in restricted browsing modes
    }
  }

  function initGenreFilter() {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const gameCards = document.querySelectorAll("[data-category]");
    const searchInput = document.getElementById("game-search");
    const emptyState = document.getElementById("filter-empty");
    const emptyMessage = document.getElementById("filter-empty-message");

    if (!filterButtons.length || !gameCards.length) return;

    const validFilters = Array.from(filterButtons).map((btn) => btn.dataset.filter);
    const savedFilter = loadSavedFilter();
    let selectedFilter = validFilters.includes(savedFilter) ? savedFilter : "all";

    function applyFilters() {
      const rawSearch = searchInput ? searchInput.value.trim() : "";
      const searchTerm = rawSearch.toLowerCase();
      let visibleCount = 0;

      gameCards.forEach((card) => {
        const category = card.dataset.category;
        const cardText = card.textContent.toLowerCase();

        const matchesFilter = selectedFilter === "all" || category === selectedFilter;
        const matchesSearch = !searchTerm || cardText.includes(searchTerm);
        const isMatch = matchesFilter && matchesSearch;

        card.classList.toggle("is-hidden", !isMatch);
        if (isMatch) visibleCount += 1;
      });

      filterButtons.forEach((btn) => {
        const active = btn.dataset.filter === selectedFilter;
        btn.setAttribute("aria-pressed", String(active));
      });

      if (emptyState) {
        emptyState.classList.toggle("is-hidden", visibleCount > 0);

        if (emptyMessage && visibleCount === 0) {
          const activeBtn = Array.from(filterButtons).find(
            (btn) => btn.dataset.filter === selectedFilter
          );
          const filterLabel = activeBtn ? activeBtn.textContent.trim() : selectedFilter;

          if (rawSearch && selectedFilter !== "all") {
            emptyMessage.textContent =
              `No games found matching "${rawSearch}" in ${filterLabel}.`;
          } else if (rawSearch) {
            emptyMessage.textContent = `No games found matching "${rawSearch}".`;
          } else {
            emptyMessage.textContent = `No games match the "${filterLabel}" filter.`;
          }
        }
      }
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedFilter = btn.dataset.filter || "all";
        saveFilter(selectedFilter);
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }

    applyFilters();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initWatchlist();
    initGenreFilter();
  });
})();
