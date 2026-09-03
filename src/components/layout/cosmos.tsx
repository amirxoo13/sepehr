/**
 * Cosmos — night-sky backdrop.
 *
 * Cost model (this is what made scroll hitch):
 *  · A 2×-DPR full-viewport canvas redrawing 720 arcs + radial
 *    gradients at 60 fps, sitting *under* every `.panel` that then
 *    re-blurred that moving buffer via backdrop-filter.
 *  · A CSS `filter: blur(18px)` nebula that was also being scaled,
 *    so the blur had to be re-rasterized every frame.
 *
 * The sky is now a static offscreen starfield (drawn once) plus a
 * handful of twinkling luminaries and the occasional meteor. The
 * canvas pauses while the user is scrolling so it never fights the
 * compositor. Nebula is a GPU-only opacity/translate, no CSS filter.
 */
import { useEffect, useRef } from "react";

const VIDEO_SRC: string | null = null;

type Star = {
  x: number;
  y: number;
  r: number;
  hue: string;
  phase: number;
  speed: number;
  base: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  len: number;
};

const STAR_COLORS = ["#cfe3ff", "#e6efff", "#ffffff", "#fff6e2", "#ffe9bd", "#ffd9a3", "#ffc48a"];

function pickColor(rand: () => number) {
  const t = rand();
  const i = t < 0.08 ? 0 : t < 0.2 ? 1 : t < 0.52 ? 2 : t < 0.76 ? 3 : t < 0.9 ? 4 : t < 0.97 ? 5 : 6;
  return STAR_COLORS[i]!;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Cosmos() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let plate: HTMLCanvasElement | null = null;
    let twinklers: Star[] = [];
    let meteors: Meteor[] = [];
    let raf = 0;
    let running = true;
    let scrolling = false;
    let t0 = performance.now();
    let lastDraw = 0;

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.25);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cap = coarse ? 160 : 280;
      const count = Math.min(cap, Math.max(90, Math.round(w * h * 0.00007)));
      const rand = mulberry32(20260903);
      const field: Star[] = [];
      twinklers = [];

      for (let i = 0; i < count; i++) {
        const m = rand();
        const r = 0.35 + Math.pow(m, 3) * 1.7;
        const s: Star = {
          x: rand() * w,
          y: rand() * h,
          r,
          hue: pickColor(rand),
          phase: rand() * Math.PI * 2,
          speed: 0.4 + rand() * 1.2,
          base: 0.28 + rand() * 0.55,
        };
        if (r > 1.35) twinklers.push(s);
        else field.push(s);
      }

      plate = document.createElement("canvas");
      plate.width = canvas!.width;
      plate.height = canvas!.height;
      const pctx = plate.getContext("2d");
      if (!pctx) return;
      pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const s of field) {
        pctx.globalAlpha = s.base;
        pctx.fillStyle = s.hue;
        const d = Math.max(0.7, s.r * 2);
        pctx.fillRect(s.x - d / 2, s.y - d / 2, d, d);
      }
      // Bake the bright-star cores onto the plate too, so a paused frame
      // still looks complete. Twinklers overlay a halo on top.
      for (const s of twinklers) {
        pctx.globalAlpha = s.base;
        pctx.fillStyle = s.hue;
        pctx.beginPath();
        pctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        pctx.fill();
      }
      pctx.globalAlpha = 1;
      meteors = [];
      blit(1);
    }

    function blit(twinkleAmp: number) {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);
      if (plate) ctx!.drawImage(plate, 0, 0, w, h);
      for (const s of twinklers) {
        const tw = 0.55 + 0.45 * Math.sin(twinkleAmp * s.speed + s.phase);
        ctx!.globalAlpha = s.base * tw * 0.45;
        ctx!.fillStyle = s.hue;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r * 4.2, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function spawnMeteor() {
      const fromLeft = Math.random() < 0.5;
      const speed = 7 + Math.random() * 6;
      const angle = (Math.random() * 18 + 16) * (Math.PI / 180);
      meteors.push({
        x: fromLeft ? -60 : w + 60,
        y: Math.random() * h * 0.55,
        vx: (fromLeft ? 1 : -1) * Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 60 + Math.random() * 40,
        len: 90 + Math.random() * 130,
      });
    }

    function frame(now: number) {
      if (!running || scrolling) return;
      // ~24 fps is plenty for a backdrop and leaves the compositor free.
      if (now - lastDraw < 40) {
        raf = requestAnimationFrame(frame);
        return;
      }
      lastDraw = now;
      const elapsed = (now - t0) / 1000;
      blit(elapsed);

      if (meteors.length < 1 && Math.random() < 0.0018) spawnMeteor();
      meteors = meteors.filter((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.life += 1.6;
        const k = 1 - m.life / m.max;
        if (k <= 0) return false;
        const hyp = Math.hypot(m.vx, m.vy) || 1;
        const tailX = m.x - (m.vx / hyp) * m.len;
        const tailY = m.y - (m.vy / hyp) * m.len;
        ctx!.globalAlpha = 0.85 * k;
        ctx!.strokeStyle = "rgba(255,244,214,0.9)";
        ctx!.lineWidth = 1.4;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(m.x, m.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();
        ctx!.globalAlpha = 1;
        return true;
      });

      raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        t0 = performance.now() - 1000;
        raf = requestAnimationFrame(frame);
      }
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 180);
    }

    let scrollTimer: ReturnType<typeof setTimeout>;
    function onScroll() {
      scrolling = true;
      cancelAnimationFrame(raf);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
        if (running && !reduced) raf = requestAnimationFrame(frame);
      }, 140);
    }

    build();
    if (!reduced) raf = requestAnimationFrame(frame);
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      clearTimeout(scrollTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [contain:strict]"
    >
      <div className="nebula absolute -inset-[8%] opacity-60" />

      {VIDEO_SRC ? (
        <video
          className="absolute inset-0 size-full object-cover opacity-35 mix-blend-screen"
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      ) : null}

      <canvas ref={canvasRef} className="absolute inset-0 size-full" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 40%, rgba(4,5,12,0.55) 100%)",
        }}
      />
    </div>
  );
}
