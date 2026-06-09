/* =========================================================
   Site logic: mobile menu, scroll-reveal, footer year.
   (p5 sketches live in their own files.)
   ========================================================= */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    /* --- mobile menu toggle --- */
    const toggle = document.querySelector(".nav__toggle");
    const menu = document.getElementById("nav-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const open = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      // close menu after picking a link (mobile)
      menu.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        })
      );
    }

    /* --- scroll reveal via IntersectionObserver --- */
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      reveals.forEach((el) => io.observe(el));
    } else {
      // fallback: just show everything
      reveals.forEach((el) => el.classList.add("is-visible"));
    }

    /* --- footer year --- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
