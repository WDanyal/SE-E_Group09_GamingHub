/**
 * Gaming Hub - Shared Interactive Controls
 * Handles genre filtering, search (trending.html), and persistent state.
 */

(function () {
  const WATCHLIST_KEY = "gamingHubWatchlist";
  const FILTER_KEY = "gamingHubSelectedFilter";
  const CHEAT_BOOKMARKS_KEY = "gamingHubGtaCheats";

  function loadSavedList(key) {
    try {
      const saved = localStorage.getItem(key);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveList(key, list) {
    try {
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
      // Ignore storage failures in restricted browsing modes
    }
  }

  function initWatchlist() {
    const buttons = document.querySelectorAll("[data-watchlist-id]");
    const countEl = document.getElementById("watchlist-count");
    let watchlist = loadSavedList(WATCHLIST_KEY);

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

        saveList(WATCHLIST_KEY, watchlist);
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

  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Fall through to legacy fallback
      }
    }

    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    tempInput.setAttribute("readonly", "");
    tempInput.style.position = "absolute";
    tempInput.style.left = "-9999px";
    document.body.appendChild(tempInput);
    tempInput.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    document.body.removeChild(tempInput);
    return copied;
  }

  function initGtaCheats() {
    const toggleBtn = document.getElementById("toggle-cheats-btn");
    const cheatsPanel = document.getElementById("cheats-panel");
    if (!toggleBtn || !cheatsPanel) return;

    const bookmarkButtons = document.querySelectorAll("[data-cheat-bookmark]");
    const copyButtons = document.querySelectorAll("[data-copy-code]");
    const bookmarkCountEl = document.getElementById("cheats-bookmark-count");
    let bookmarkedCheats = loadSavedList(CHEAT_BOOKMARKS_KEY);

    toggleBtn.addEventListener("click", () => {
      const isHidden = cheatsPanel.classList.toggle("is-hidden");
      const isExpanded = !isHidden;
      toggleBtn.setAttribute("aria-expanded", String(isExpanded));
      toggleBtn.textContent = isExpanded
        ? "Hide Cheats & Codes"
        : "Show Cheats & Codes";
    });

    function syncBookmarks() {
      bookmarkButtons.forEach((btn) => {
        const id = btn.dataset.cheatBookmark;
        const isSaved = bookmarkedCheats.includes(id);
        btn.setAttribute("aria-pressed", String(isSaved));
        btn.textContent = isSaved ? "Bookmarked" : "Bookmark";
      });

      if (bookmarkCountEl) {
        bookmarkCountEl.textContent = String(bookmarkedCheats.length);
      }
    }

    bookmarkButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.cheatBookmark;
        if (!id) return;

        if (bookmarkedCheats.includes(id)) {
          bookmarkedCheats = bookmarkedCheats.filter((item) => item !== id);
        } else {
          bookmarkedCheats.push(id);
        }

        saveList(CHEAT_BOOKMARKS_KEY, bookmarkedCheats);
        syncBookmarks();
      });
    });

    copyButtons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const code = btn.dataset.copyCode;
        if (!code) return;

        const copied = await copyToClipboard(code);
        btn.textContent = copied ? "Copied!" : "Copy failed";

        clearTimeout(btn._copyTimer);
        btn._copyTimer = setTimeout(() => {
          btn.textContent = "Copy";
        }, 1500);
      });
    });

    syncBookmarks();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initWatchlist();
    initGenreFilter();
    initGtaCheats();
  });
})();
