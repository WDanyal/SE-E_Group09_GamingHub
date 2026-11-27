/* ==========================================================================
   Gaming Hub — Contact Page Interactions
   Handles mobile navigation and contact form validation on contact.html
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initContactForm();
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
 * Client-side validation and confirmation message on contact.html.
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const topicSelect = document.getElementById("topic");
  const messageInput = document.getElementById("message");
  const statusBox = document.getElementById("form-status");

  const fields = [
    {
      el: nameInput,
      errorEl: document.getElementById("name-error"),
      validate: (val) =>
        val.trim().length >= 2 ? "" : "Please enter at least 2 characters.",
    },
    {
      el: emailInput,
      errorEl: document.getElementById("email-error"),
      validate: (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
          ? ""
          : "Please enter a valid email address.",
    },
    {
      el: topicSelect,
      errorEl: document.getElementById("topic-error"),
      validate: (val) => (val ? "" : "Please select a topic."),
    },
    {
      el: messageInput,
      errorEl: document.getElementById("message-error"),
      validate: (val) =>
        val.trim().length >= 10
          ? ""
          : "Please enter a message (at least 10 characters).",
    },
  ];

  const setFieldError = (field, message) => {
    field.el.classList.toggle("is-invalid", Boolean(message));
    if (field.errorEl) {
      field.errorEl.textContent = message;
    }
  };

  fields.forEach((field) => {
    if (!field.el) return;
    const eventName = field.el.tagName === "SELECT" ? "change" : "input";
    field.el.addEventListener(eventName, () => {
      if (field.el.classList.contains("is-invalid")) {
        setFieldError(field, field.validate(field.el.value));
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (statusBox) {
      statusBox.className = "form-status hidden";
      statusBox.textContent = "";
    }

    let firstInvalid = null;

    fields.forEach((field) => {
      if (!field.el) return;
      const errorMsg = field.validate(field.el.value);
      setFieldError(field, errorMsg);
      if (errorMsg && !firstInvalid) {
        firstInvalid = field.el;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const senderName = nameInput.value.trim();
    form.reset();

    if (statusBox) {
      statusBox.textContent = `Thanks, ${senderName}! Your message has been received and our team will review it shortly.`;
      statusBox.className = "form-status success";
    }
  });
}
