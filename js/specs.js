/* ==========================================================================
   Gaming Hub — Shared Vanilla JavaScript
   Handles mobile nav toggle, card filtering, and spec card comparison pin.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initCardFilters();
  initCardHighlightToggles();
});

/**
 * Toggles the mobile navigation menu and updates aria-expanded state.
 */
function initMobileNav() {
  const toggleBtn = document.querySelector("[data-nav-toggle]");
  const navList = document.querySelector("[data-nav-list]");

  if (!toggleBtn || !navList) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

/**
 * Filters cards in a [data-filter-grid] container using [data-filter] buttons.
 */
function initCardFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  const countEl = document.querySelector("[data-result-count]");

  if (!filterButtons.length || !cards.length) return;

  const updateView = (selected) => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const categories = (card.dataset.category || "").split(/\s+/);
      const matches = selected === "all" || categories.includes(selected);
      card.classList.toggle("is-hidden", !matches);
      if (matches) visibleCount += 1;
    });

    if (countEl) {
      countEl.textContent = `Showing ${visibleCount} of ${cards.length}`;
    }
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.filter || "all";

      filterButtons.forEach((other) => {
        const active = other === btn;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", String(active));
      });

      updateView(selected);
    });
  });

  updateView("all");
}

/**
 * Allows users to pin/highlight spec or hardware cards for side-by-side focus.
 */
function initCardHighlightToggles() {
  const actionButtons = document.querySelectorAll("[data-pin-card]");

  if (!actionButtons.length) return;

  actionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      if (!card) return;

      const isPinned = card.classList.toggle("is-highlighted");
      btn.classList.toggle("is-active", isPinned);
      btn.setAttribute("aria-pressed", String(isPinned));
      btn.textContent = isPinned ? "Pinned for Compare" : "Pin to Compare";
    });
  });
}
