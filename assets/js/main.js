"use strict";

/* =========================
   1) Mobile nav toggle
   ========================= */
const toggleBtn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after clicking any nav anchor (mobile UX)
  navLinks.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "A") {
      navLinks.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/* =========================
   2) Footer year
   ========================= */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================
   3) Copy email helper
   =========================
*/
const copyBtn = document.getElementById("copyEmailBtn");
const copyStatus = document.getElementById("copyStatus");
const EMAIL = "arshvinths@gmail.com"; 

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      if (copyStatus) copyStatus.textContent = "Email copied to clipboard.";
    } catch (err) {
      // Clipboard can fail on HTTP or in restricted browser contexts
      if (copyStatus) copyStatus.textContent = "Could not copy. Email: " + EMAIL;
    }
  });
}

/* =========================
   4) Scroll reveal
   =========================
*/
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      }
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));
}

/* =========================
   5) Active nav highlight
   =========================
*/
const sectionIds = ["projects", "skills", "education", "certifications", "contact"];
const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

function setActiveLink(id) {
  for (const a of navAnchors) a.classList.remove("active");
  const match = navAnchors.find((a) => a.getAttribute("href") === `#${id}`);
  if (match) match.classList.add("active");
}

const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if (sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target && visible.target.id) {
        setActiveLink(visible.target.id);
      }
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0.08, 0.12, 0.18, 0.25],
    }
  );

  sections.forEach((s) => sectionObserver.observe(s));
}

/* =========================
   6) Theme toggle
   =========================
   - Dark: default (no data-theme attribute)
   - Light: <html data-theme="light">
*/
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeIcon) themeIcon.textContent = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (themeIcon) themeIcon.textContent = "🌙";
  }
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "light" ? "light" : "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const nextTheme = isLight ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
}