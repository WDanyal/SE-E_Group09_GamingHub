/* ==========================================================================
   Gaming Hub — News Page Interactions
   Handles mobile navigation and news category filtering on news.html
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initNewsFilter();
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
 * Filter news cards by category on news.html.
 */
function initNewsFilter() {
  const newsGrid = document.getElementById("news-grid");
  if (!newsGrid) return;

  const filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
  const cards = newsGrid.querySelectorAll(".news-card");
  const countEl = document.getElementById("news-count");
  const emptyEl = document.getElementById("news-empty");

  const applyFilter = (category) => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const matches =
        category === "all" || card.dataset.category === category;
      card.classList.toggle("hidden", !matches);
      if (matches) visibleCount += 1;
    });

    filterButtons.forEach((btn) => {
      const isActive = btn.dataset.filter === category;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    if (countEl) {
      countEl.textContent = `${visibleCount} ${
        visibleCount === 1 ? "article" : "articles"
      }`;
    }

    if (emptyEl) {
      emptyEl.classList.toggle("hidden", visibleCount > 0);
    }
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFilter(btn.dataset.filter || "all");
    });
  });
}
