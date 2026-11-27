/* ==========================================================================
   Gaming Hub — Genres Page Interactions
   Handles mobile navigation and genre filtering on genres.html
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initGenreFilter();
});

/**
 * Toggle mobile navigation menu visibility.
 */
function initMobileNav() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

/**
 * Filter game cards by genre on genres.html.
 * Keeps both genre overview cards and filter tabs in sync.
 */
function initGenreFilter() {
  const gamesGrid = document.getElementById("games-grid");
  if (!gamesGrid) return;

  const filterButtons = document.querySelectorAll(".filter-btn[data-genre]");
  const genreCards = document.querySelectorAll(".genre-card[data-genre]");
  const gameCards = gamesGrid.querySelectorAll(".game-card");
  const countEl = document.getElementById("games-count");
  const emptyEl = document.getElementById("games-empty");

  let currentGenre = "all";

  const applyGenre = (genre) => {
    currentGenre = genre;
    let visibleCount = 0;

    gameCards.forEach((card) => {
      const matches = genre === "all" || card.dataset.genre === genre;
      card.classList.toggle("hidden", !matches);
      if (matches) visibleCount += 1;
    });

    filterButtons.forEach((btn) => {
      const isActive = btn.dataset.genre === genre;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    genreCards.forEach((card) => {
      const isActive = card.dataset.genre === genre;
      card.classList.toggle("active", isActive);
      card.setAttribute("aria-pressed", String(isActive));
    });

    if (countEl) {
      countEl.textContent = `${visibleCount} ${
        visibleCount === 1 ? "game" : "games"
      }`;
    }

    if (emptyEl) {
      emptyEl.classList.toggle("hidden", visibleCount > 0);
    }
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyGenre(btn.dataset.genre || "all");
    });
  });

  genreCards.forEach((card) => {
    card.addEventListener("click", () => {
      const clickedGenre = card.dataset.genre || "all";
      const nextGenre = currentGenre === clickedGenre ? "all" : clickedGenre;
      applyGenre(nextGenre);
    });
  });
}
