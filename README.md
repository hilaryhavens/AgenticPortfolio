# ☁︎ Digital Humanities Portfolio

A responsive, cute academic portfolio for a digital humanities scholar, with a
**Cinnamoroll-inspired sky-blue Sanrio palette** and lots of **p5.js animation**.

Built as a plain static site — no build step, no framework — so it's easy to
edit and deploys straight to GitHub Pages.

## ✨ Features

- **Sky-blue Sanrio aesthetic** — pastel palette, rounded shapes, cloud motifs,
  soft shadows, friendly rounded fonts (Quicksand + Nunito).
- **p5.js animation** (instance mode, loaded via CDN):
  - `js/sketch-bg.js` — full-page drifting clouds, twinkling sparkles, and a
    soft sky gradient with subtle scroll parallax.
  - `js/sketch-hero.js` — interactive floating bubbles that drift, dodge your
    cursor, and pop on click/tap.
- **Responsive** — mobile-first, fluid type with `clamp()`, CSS Grid, and a
  hamburger menu on small screens.
- **Accessible & performant** — respects `prefers-reduced-motion`, pauses the
  background when the tab is hidden, caps frame rate, decorative canvases are
  `aria-hidden`, includes a skip link.

## 📁 Structure

\`\`\`
index.html              All sections (Hero, About, Research, Publications/CV, Contact)
css/styles.css          Palette tokens, layout, components, responsive rules
js/sketch-bg.js         Global animated background sketch
js/sketch-hero.js       Interactive hero bubbles sketch
js/main.js              Mobile menu, scroll-reveal, footer year
assets/favicon.svg      Cloud favicon
assets/cv-placeholder.pdf  Placeholder CV (replace with your own)
.github/workflows/deploy-pages.yml  GitHub Pages deploy
.nojekyll               Skip Jekyll processing on Pages
\`\`\`

## 🛠 Run locally

No dependencies. Serve the folder with any static server, e.g.:

\`\`\`bash
python3 -m http.server 8000
# then open http://localhost:8000
\`\`\`

## 🚀 Deploy (GitHub Pages)

1. Push to `main` (or the development branch).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow publishes the site automatically on each push.

## ✏️ Make it yours

All copy is placeholder. Edit `index.html` to swap in your name, bio, research
interests, project cards, publications, links, and replace
`assets/cv-placeholder.pdf` with your real CV. Tweak the palette via the CSS
custom properties at the top of `css/styles.css`.