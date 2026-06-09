/* =========================================================
   Global animated background (p5.js instance mode)
   Soft sky gradient + drifting clouds + twinkling sparkles.
   Decorative only — paused when tab hidden, calmed on reduce-motion.
   ========================================================= */

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sketch = (p) => {
    let clouds = [];
    let sparkles = [];
    let scrollY = 0;

    // palette (Badtz-Maru: near-white sky, soft-gray clouds, yellow stars)
    const SKY_TOP = [255, 255, 255];
    const SKY_BOT = [243, 243, 241];   // --cream

    function makeClouds() {
      clouds = [];
      const count = p.windowWidth < 600 ? 5 : 9;
      for (let i = 0; i < count; i++) {
        clouds.push({
          x: p.random(p.width),
          y: p.random(p.height * 0.85),
          scale: p.random(0.6, 1.8),
          speed: p.random(0.15, 0.5),
          depth: p.random(0.2, 1), // for parallax
        });
      }
    }

    function makeSparkles() {
      sparkles = [];
      const count = p.windowWidth < 600 ? 18 : 40;
      for (let i = 0; i < count; i++) {
        sparkles.push({
          x: p.random(p.width),
          y: p.random(p.height),
          r: p.random(1, 3),
          phase: p.random(p.TWO_PI),
          twinkle: p.random(0.01, 0.04),
        });
      }
    }

    function drawCloud(c) {
      const py = c.y - scrollY * 0.08 * c.depth;
      p.push();
      p.translate(c.x, py);
      p.scale(c.scale);
      p.noStroke();
      p.fill(228, 230, 235, 150); // soft gray cloud on light bg
      p.ellipse(0, 0, 60, 38);
      p.ellipse(-26, 6, 40, 30);
      p.ellipse(26, 6, 44, 32);
      p.ellipse(0, 10, 80, 30);
      p.pop();
    }

    // draw a small 5-point star centered at (x, y)
    function drawStar(x, y, radius, col, a) {
      const inner = radius * 0.45;
      p.push();
      p.translate(x, y);
      p.noStroke();
      p.fill(col[0], col[1], col[2], a);
      p.beginShape();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? radius : inner;
        const ang = (p.PI / 5) * i - p.HALF_PI;
        p.vertex(p.cos(ang) * r, p.sin(ang) * r);
      }
      p.endShape(p.CLOSE);
      p.pop();
    }

    p.setup = function () {
      const holder = document.getElementById("bg-canvas");
      const cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.parent(holder);
      p.frameRate(30);
      makeClouds();
      makeSparkles();
      if (reduceMotion) {
        p.draw();        // draw a single static frame
        p.noLoop();
      }
    };

    p.draw = function () {
      // vertical gradient sky
      for (let y = 0; y < p.height; y++) {
        const t = y / p.height;
        const r = p.lerp(SKY_TOP[0], SKY_BOT[0], t);
        const g = p.lerp(SKY_TOP[1], SKY_BOT[1], t);
        const b = p.lerp(SKY_TOP[2], SKY_BOT[2], t);
        p.stroke(r, g, b);
        p.line(0, y, p.width, y);
      }

      // twinkling yellow stars
      for (const s of sparkles) {
        s.phase += s.twinkle;
        const a = 110 + Math.sin(s.phase) * 120;
        drawStar(s.x, s.y, s.r * 2.4, [255, 210, 30], a);
      }

      // clouds
      for (const c of clouds) {
        if (!reduceMotion) {
          c.x += c.speed;
          if (c.x > p.width + 80) c.x = -80;
        }
        drawCloud(c);
      }
    };

    p.windowResized = function () {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      makeClouds();
      makeSparkles();
      if (reduceMotion) p.redraw();
    };

    // parallax + pause when hidden
    window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (reduceMotion) return;
      if (document.hidden) p.noLoop();
      else p.loop();
    });
  };

  window.addEventListener("DOMContentLoaded", () => new p5(sketch));
})();
