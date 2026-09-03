/**
 * Cosmos — the animated night-sky backdrop for the whole app.
 *
 * Three stacked layers, all `fixed` and `pointer-events-none`:
 *   1. CSS nebula clouds (cheap, blurred, slowly drifting)
 *   2. An optional looping <video> (self-hosted; see VIDEO_SRC below)
 *   3. A canvas starfield: three parallax depths, per-star twinkle,
 *      occasional meteors, and a slow global drift.
 *
 * Design notes
 * ────────────
 * The canvas is deliberately *not* a particle toy: star sizes follow a
 * magnitude distribution (many faint, few bright), colours run along a
 * real stellar temperature ramp (blue-white → white → gold → amber), and
 * the brightest stars get a four-point diffraction cross the way they
 * appear on a long exposure. That's what separates this from the usual
 * "random white dots" background.
 *
 * Performance
 * ───────────
 * - Star count scales with viewport area and is capped.
 * - Rendering pauses when the tab is hidden.
 * - `prefers-reduced-motion` renders one static frame and stops.
 * - Runs on a devicePixelRatio-capped backing store (max 2).
 */
import { useEffect, useRef } from "react";

/**
 * Optional video layer.
 *
 * Leave as `null` to use the canvas starfield alone (recommended: it is
 * ~20 KB of JS instead of a multi-megabyte download, works offline, and
 * never blocks first paint).
 *
 * To use a video instead, put an MP4/WebM in `public/` and set this to
 * e.g. "/sky.mp4". Do NOT hot-link a video from another site: it breaks
 * when they change the URL, costs them bandwidth, and is usually a
 * licence violation. Free, properly-licensed loops are on Pexels,
 * Pixabay and NASA's public-domain library.
 */
const VIDEO_SRC: string | null = null;

type Star = {
  x: number;
  y: number;
  r: number;
  depth: number;
  hue: string;
  /** twinkle phase + speed */
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

/** Stellar colour ramp, roughly O→M spectral classes. */
const STAR_COLORS = [
  "#cfe3ff", // hot blue-white
  "#e6efff",
  "#ffffff",
  "#fff6e2",
  "#ffe9bd", // gold
  "#ffd9a3",
  "#ffc48a", // amber
];

function pickColor(rand: () => number) {
  // Weight toward white/gold so the field reads warm, not clinical.
  const t = rand();
  const i =
    t < 0.08 ? 0 : t < 0.2 ? 1 : t < 0.52 ? 2 : t < 0.76 ? 3 : t < 0.9 ? 4 : t < 0.97 ? 5 : 6;
  return STAR_COLORS[i]!;
}

/** Deterministic PRNG so the sky is identical between SSR reloads. */
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
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let raf = 0;
    let running = true;
    let t0 = performance.now();

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = 0.00016; // stars per px²
      const count = Math.min(720, Math.max(150, Math.round(w * h * density)));
      const rand = mulberry32(20260903);

      stars = Array.from({ length: count }, () => {
        const depth = rand();
        // Magnitude distribution: r^3 makes bright stars genuinely rare.
        const m = rand();
        const r = 0.35 + Math.pow(m, 3) * 1.9;
        return {
          x: rand() * w,
          y: rand() * h,
          r,
          depth,
          hue: pickColor(rand),
          phase: rand() * Math.PI * 2,
          speed: 0.4 + rand() * 1.5,
          base: 0.25 + rand() * 0.6,
        };
      });
      meteors = [];
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

    function drawStar(s: Star, alpha: number, driftX: number, driftY: number) {
      const px = (s.x + driftX * (0.3 + s.depth)) % w;
      const py = (s.y + driftY * (0.3 + s.depth)) % h;
      const x = px < 0 ? px + w : px;
      const y = py < 0 ? py + h : py;

      ctx!.globalAlpha = alpha;
      ctx!.fillStyle = s.hue;
      ctx!.beginPath();
      ctx!.arc(x, y, s.r, 0, Math.PI * 2);
      ctx!.fill();

      // Bright stars get a soft halo + diffraction cross.
      if (s.r > 1.55) {
        const g = ctx!.createRadialGradient(x, y, 0, x, y, s.r * 7);
        g.addColorStop(0, s.hue);
        g.addColorStop(1, "transparent");
        ctx!.globalAlpha = alpha * 0.22;
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(x, y, s.r * 7, 0, Math.PI * 2);
        ctx!.fill();

        const spike = s.r * 5.5;
        ctx!.globalAlpha = alpha * 0.35;
        ctx!.strokeStyle = s.hue;
        ctx!.lineWidth = 0.6;
        ctx!.beginPath();
        ctx!.moveTo(x - spike, y);
        ctx!.lineTo(x + spike, y);
        ctx!.moveTo(x, y - spike);
        ctx!.lineTo(x, y + spike);
        ctx!.stroke();
      }
    }

    function frame(now: number) {
      if (!running) return;
      const elapsed = (now - t0) / 1000;
      ctx!.clearRect(0, 0, w, h);

      // Very slow global drift: a full pass takes ~25 minutes.
      const driftX = reduced ? 0 : elapsed * 0.9;
      const driftY = reduced ? 0 : elapsed * 0.22;

      for (const s of stars) {
        const tw = reduced ? 1 : 0.55 + 0.45 * Math.sin(elapsed * s.speed + s.phase);
        drawStar(s, s.base * tw, driftX, driftY);
      }

      if (!reduced) {
        if (meteors.length < 2 && Math.random() < 0.0022) spawnMeteor();
        meteors = meteors.filter((m) => {
          m.x += m.vx;
          m.y += m.vy;
          m.life += 1;
          const k = 1 - m.life / m.max;
          if (k <= 0) return false;
          const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.len;
          const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.len;
          const g = ctx!.createLinearGradient(m.x, m.y, tailX, tailY);
          g.addColorStop(0, `rgba(255,244,214,${0.85 * k})`);
          g.addColorStop(1, "rgba(255,244,214,0)");
          ctx!.globalAlpha = 1;
          ctx!.strokeStyle = g;
          ctx!.lineWidth = 1.6;
          ctx!.lineCap = "round";
          ctx!.beginPath();
          ctx!.moveTo(m.x, m.y);
          ctx!.lineTo(tailX, tailY);
          ctx!.stroke();
          return true;
        });
      }

      ctx!.globalAlpha = 1;
      if (reduced) return; // one static frame is enough
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
      resizeTimer = setTimeout(() => {
        build();
        if (reduced) requestAnimationFrame(frame);
      }, 160);
    }

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* 1 — nebula clouds */}
      <div className="nebula absolute -inset-[10%] opacity-70" />

      {/* 2 — optional self-hosted video loop */}
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

      {/* 3 — canvas starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />

      {/* 4 — vignette so text always sits on a calm ground */}
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
