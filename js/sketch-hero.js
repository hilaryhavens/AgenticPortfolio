/* =========================================================
   Hero interactive sketch (p5.js instance mode)
   Floating pastel bubbles that gently drift and react to the
   cursor / touch — drift away when pushed, pop on click/tap.
   Decorative only.
   ========================================================= */

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sketch = (p) => {
    let bubbles = [];
    let holder;

    // Badtz-Maru fills: penguin black, yellow, orange beak, white
    const PALETTE = [
      [27, 27, 34],
      [255, 210, 30],
      [255, 138, 61],
      [255, 255, 255],
    ];

    function spawn(n) {
      bubbles = [];
      for (let i = 0; i < n; i++) bubbles.push(newBubble());
    }

    function newBubble(atTop) {
      const col = PALETTE[Math.floor(p.random(PALETTE.length))];
      return {
        x: p.random(p.width),
        y: atTop ? -20 : p.random(p.height),
        r: p.random(10, 34),
        vx: p.random(-0.4, 0.4),
        vy: p.random(-0.7, -0.2),
        col,
        alpha: p.random(120, 210),
        wob: p.random(p.TWO_PI),
      };
    }

    p.setup = function () {
      holder = document.getElementById("hero-canvas");
      const cnv = p.createCanvas(holder.offsetWidth, holder.offsetHeight);
      cnv.parent(holder);
      p.frameRate(30);
      const count = p.width < 600 ? 14 : 26;
      spawn(count);
      if (reduceMotion) { p.draw(); p.noLoop(); }
    };

    p.draw = function () {
      p.clear();
      for (const b of bubbles) {
        if (!reduceMotion) {
          // gentle drift + wobble
          b.wob += 0.02;
          b.x += b.vx + Math.sin(b.wob) * 0.3;
          b.y += b.vy;

          // cursor repulsion
          const d = p.dist(p.mouseX, p.mouseY, b.x, b.y);
          if (d < 90 && p.mouseX > 0) {
            const ang = p.atan2(b.y - p.mouseY, b.x - p.mouseX);
            b.x += p.cos(ang) * 2.2;
            b.y += p.sin(ang) * 2.2;
          }

          // recycle when off the top
          if (b.y < -40 || b.x < -40 || b.x > p.width + 40) {
            Object.assign(b, newBubble(true));
          }
        }

        // draw bubble with dark outline + soft highlight
        p.stroke(21, 21, 28, b.alpha);
        p.strokeWeight(2);
        p.fill(b.col[0], b.col[1], b.col[2], b.alpha);
        p.circle(b.x, b.y, b.r * 2);
        p.noStroke();
        p.fill(255, 255, 255, b.alpha * 0.55);
        p.circle(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.5);
      }
    };

    // pop bubbles on click / tap
    function pop() {
      for (const b of bubbles) {
        if (p.dist(p.mouseX, p.mouseY, b.x, b.y) < b.r) {
          Object.assign(b, newBubble(true));
        }
      }
    }
    p.mousePressed = function () { if (!reduceMotion) pop(); };

    p.windowResized = function () {
      if (!holder) return;
      p.resizeCanvas(holder.offsetWidth, holder.offsetHeight);
      if (reduceMotion) p.redraw();
    };
  };

  window.addEventListener("DOMContentLoaded", () => new p5(sketch));
})();
