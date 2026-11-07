"use client";

import { useEffect, useRef } from "react";

// ══════════════════════════════════════════════════════════════════
// CINEMATIC AURORA LIVE WALLPAPER
// Palette: deep burgundy · wine red · burnt coral · amber · champagne
// Rendering: optimised Canvas 2D — no Three.js
// ══════════════════════════════════════════════════════════════════

const C = {
  bg:        "#09090B", // near-black
  burgundy:  "#170D12", // deep burgundy
  wine:      "#351522", // dark wine
  wineRed:   "#6F263F", // rich wine red
  coral:     "#C05A46", // burnt coral
  amber:     "#D99A55", // warm amber
  olive:     "#A8B76A", // muted olive / lime
  champagne: "#D5C4A1", // soft champagne
} as const;

/** Convert a hex colour + alpha → CSS rgba() string */
function rgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

// ── Types ─────────────────────────────────────────────────────────

interface AuroraBand {
  color: string;
  baseY: number;     // 0-1  — vertical centre of the band
  amp: number;       // 0-1  — peak vertical displacement
  freq: number;      // wave spatial frequency (number of full cycles across width)
  speed: number;     // rad / ms
  phase: number;     // initial phase offset (rad)
  opacity: number;   // max opacity for this band
  halfThick: number; // 0-1  — half-thickness (normalised to H)
  drift: number;     // rad / ms — slow horizontal phase drift
}

interface LightOrb {
  x: number; y: number;   // 0-1 normalised
  r: number;              // 0-1 radius (relative to min(W,H))
  color: string;
  baseOpacity: number;
  breathAmp: number;      // opacity oscillation amplitude
  breathSpeed: number;    // rad / ms
  breathPhase: number;
  vx: number; vy: number; // 0-1 / ms — slow drift velocity
}

interface Particle {
  x: number; y: number;   // px
  vx: number; vy: number; // px / frame
  size: number;           // px radius
  color: string;
  baseOpacity: number;
  life: number;
  maxLife: number;
}

// ── Static data ───────────────────────────────────────────────────

const BANDS: AuroraBand[] = [
  { color: C.wineRed,   baseY: 0.62, amp: 0.11, freq: 0.9,  speed: 0.00016, phase: 0.0,  opacity: 0.60, halfThick: 0.10, drift: 0.000055 },
  { color: C.wine,      baseY: 0.50, amp: 0.09, freq: 1.2,  speed: 0.00013, phase: 1.3,  opacity: 0.50, halfThick: 0.13, drift: 0.000040 },
  { color: C.coral,     baseY: 0.38, amp: 0.08, freq: 1.5,  speed: 0.00020, phase: 2.6,  opacity: 0.38, halfThick: 0.08, drift: 0.000070 },
  { color: C.amber,     baseY: 0.72, amp: 0.07, freq: 0.7,  speed: 0.00011, phase: 0.9,  opacity: 0.30, halfThick: 0.07, drift: 0.000035 },
  { color: C.burgundy,  baseY: 0.28, amp: 0.13, freq: 0.8,  speed: 0.00015, phase: 3.2,  opacity: 0.65, halfThick: 0.15, drift: 0.000045 },
  { color: C.wineRed,   baseY: 0.84, amp: 0.06, freq: 1.1,  speed: 0.00018, phase: 1.8,  opacity: 0.42, halfThick: 0.09, drift: 0.000060 },
  { color: C.coral,     baseY: 0.18, amp: 0.10, freq: 0.6,  speed: 0.00014, phase: 4.3,  opacity: 0.28, halfThick: 0.12, drift: 0.000050 },
  { color: C.amber,     baseY: 0.55, amp: 0.05, freq: 2.0,  speed: 0.00024, phase: 5.1,  opacity: 0.22, halfThick: 0.05, drift: 0.000080 },
];

const ORBS: LightOrb[] = [
  { x: 0.18, y: 0.50, r: 0.38, color: C.wineRed,  baseOpacity: 0.20, breathAmp: 0.04, breathSpeed: 0.00080, breathPhase: 0.0, vx:  0.000075, vy:  0.000055 },
  { x: 0.75, y: 0.28, r: 0.30, color: C.coral,    baseOpacity: 0.16, breathAmp: 0.03, breathSpeed: 0.00065, breathPhase: 1.2, vx: -0.000060, vy:  0.000040 },
  { x: 0.50, y: 0.78, r: 0.42, color: C.wine,     baseOpacity: 0.24, breathAmp: 0.05, breathSpeed: 0.00050, breathPhase: 2.4, vx:  0.000045, vy: -0.000070 },
  { x: 0.88, y: 0.62, r: 0.24, color: C.amber,    baseOpacity: 0.14, breathAmp: 0.03, breathSpeed: 0.00090, breathPhase: 3.6, vx: -0.000085, vy:  0.000030 },
  { x: 0.08, y: 0.22, r: 0.28, color: C.burgundy, baseOpacity: 0.22, breathAmp: 0.04, breathSpeed: 0.00070, breathPhase: 4.8, vx:  0.000055, vy:  0.000085 },
  { x: 0.60, y: 0.12, r: 0.20, color: C.coral,    baseOpacity: 0.12, breathAmp: 0.02, breathSpeed: 0.00110, breathPhase: 0.7, vx: -0.000040, vy:  0.000060 },
];

const PARTICLE_COLORS = [
  C.champagne, C.champagne, // champagne most common
  C.amber, C.amber,
  C.coral,
  C.olive,
];

export default function LiveWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Cast both refs at assignment so TypeScript treats them as non-null
    // in all nested closures (TS doesn't narrow across function boundaries).
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Sizing ──────────────────────────────────────────────────
    let W = 0;
    let H = 0;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    }
    resize();

    // ── Orb instances (mutable copies) ──────────────────────────
    const orbs: LightOrb[] = ORBS.map(o => ({ ...o }));

    // ── Particle factory ────────────────────────────────────────
    const PARTICLE_COUNT = reduced ? 15 : 55;

    function makeParticle(randomY = false): Particle {
      return {
        x:           Math.random() * W,
        y:           randomY ? Math.random() * H : H + 12,
        vx:          (Math.random() - 0.5) * 0.25,
        vy:          -(Math.random() * 0.35 + 0.08),
        size:        Math.random() * 2.2 + 0.5,
        color:       PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        baseOpacity: Math.random() * 0.55 + 0.12,
        life:        randomY ? Math.floor(Math.random() * 300) : 0,
        maxLife:     (Math.random() * 320 + 180) | 0,
      };
    }

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => makeParticle(true));

    // ── Tab visibility ───────────────────────────────────────────
    let visible = true;
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    // ── Resize debounce ──────────────────────────────────────────
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── Draw helpers ─────────────────────────────────────────────

    /** Solid background + subtle base gradient */
    function drawBackground() {
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);

      // Deep burgundy rise from centre-bottom — very subtle
      const g = ctx.createRadialGradient(W * 0.5, H * 0.75, 0, W * 0.5, H * 0.75, Math.max(W, H) * 0.8);
      g.addColorStop(0.0, rgba(C.wine,     0.35));
      g.addColorStop(0.4, rgba(C.burgundy, 0.20));
      g.addColorStop(1.0, rgba(C.bg,       0.00));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    /** Soft glowing light orbs (screen blend) */
    function drawOrbs(t: number) {
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (const orb of orbs) {
        const opacity = orb.baseOpacity + Math.sin(t * orb.breathSpeed + orb.breathPhase) * orb.breathAmp;
        const cx = orb.x * W;
        const cy = orb.y * H;
        const r  = orb.r * Math.min(W, H);

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0.00, rgba(orb.color, opacity));
        g.addColorStop(0.35, rgba(orb.color, opacity * 0.45));
        g.addColorStop(0.70, rgba(orb.color, opacity * 0.10));
        g.addColorStop(1.00, rgba(orb.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    /**
     * Single aurora band — rendered as a closed sine-wave strip with a
     * vertical gradient that fades to transparent at both edges.
     */
    function drawBand(band: AuroraBand, t: number) {
      const STEPS = Math.ceil(W / 3); // ~1 segment every 3 px
      const halfY = band.halfThick * H;
      const phase = t * band.speed + band.phase;
      const drift = t * band.drift;

      // Precompute top/bottom Y arrays
      const topY    = new Float32Array(STEPS + 1);
      const bottomY = new Float32Array(STEPS + 1);
      let minY =  Infinity;
      let maxY = -Infinity;

      for (let i = 0; i <= STEPS; i++) {
        const nx = i / STEPS;
        const wave = Math.sin(nx * Math.PI * 2 * band.freq + phase + drift) * band.amp * H
                   + Math.sin(nx * Math.PI * 2 * band.freq * 1.7 + phase * 0.6) * band.amp * H * 0.18;
        const cy = band.baseY * H + wave;
        topY[i]    = cy - halfY;
        bottomY[i] = cy + halfY;
        if (cy - halfY < minY) minY = cy - halfY;
        if (cy + halfY > maxY) maxY = cy + halfY;
      }

      // Build path
      ctx.beginPath();
      ctx.moveTo(0, topY[0]);
      for (let i = 1; i <= STEPS; i++) {
        ctx.lineTo((i / STEPS) * W, topY[i]);
      }
      for (let i = STEPS; i >= 0; i--) {
        ctx.lineTo((i / STEPS) * W, bottomY[i]);
      }
      ctx.closePath();

      // Vertical gradient across the actual extents of the band
      const g = ctx.createLinearGradient(0, minY, 0, maxY);
      g.addColorStop(0.00, rgba(band.color, 0));
      g.addColorStop(0.25, rgba(band.color, band.opacity * 0.75));
      g.addColorStop(0.50, rgba(band.color, band.opacity));
      g.addColorStop(0.75, rgba(band.color, band.opacity * 0.75));
      g.addColorStop(1.00, rgba(band.color, 0));
      ctx.fillStyle = g;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.restore();
    }

    /** Soft glowing floating particles */
    function drawParticles() {
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (const p of particles) {
        const t01 = p.life / p.maxLife;
        // Fade-in then fade-out
        const alpha = p.baseOpacity * Math.sin(t01 * Math.PI);
        if (alpha < 0.01) continue;

        // Soft glow: draw two circles — small bright core + larger dim halo
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = alpha * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.restore();
    }

    /** Subtle warm-amber energy streaks — very faint, long horizontal wisps */
    function drawEnergyStreaks(t: number) {
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.07;

      const STREAKS = 4;
      for (let i = 0; i < STREAKS; i++) {
        const y    = H * (0.2 + i * 0.18 + Math.sin(t * 0.00009 + i * 1.4) * 0.04);
        const len  = W * (0.3 + Math.sin(t * 0.00007 + i * 2.1) * 0.15);
        const xOff = W * (0.1 + Math.sin(t * 0.00011 + i * 0.9) * 0.3);
        const color = i % 2 === 0 ? C.amber : C.coral;

        const g = ctx.createLinearGradient(xOff, y, xOff + len, y);
        g.addColorStop(0,   rgba(color, 0));
        g.addColorStop(0.3, rgba(color, 1));
        g.addColorStop(0.7, rgba(color, 1));
        g.addColorStop(1,   rgba(color, 0));

        ctx.strokeStyle = g;
        ctx.lineWidth   = 1.2;
        ctx.beginPath();
        ctx.moveTo(xOff, y);
        ctx.lineTo(xOff + len, y);
        ctx.stroke();
      }

      ctx.restore();
    }

    /** Atmospheric dust haze */
    function drawDustHaze(t: number) {
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.06;

      const cx = W * (0.5 + Math.sin(t * 0.000045) * 0.2);
      const cy = H * (0.5 + Math.cos(t * 0.000038) * 0.15);
      const r  = Math.min(W, H) * 0.55;

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0,   rgba(C.champagne, 0.7));
      g.addColorStop(0.5, rgba(C.amber,     0.3));
      g.addColorStop(1,   rgba(C.amber,     0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      ctx.restore();
    }

    /**
     * Vignette — deepens the edges into near-black so the content
     * area remains legible without an opacity layer over text.
     */
    function drawVignette() {
      const g = ctx.createRadialGradient(W * 0.5, H * 0.5, H * 0.25, W * 0.5, H * 0.5, H * 0.9);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.70)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    // ── State update ─────────────────────────────────────────────

    function update(dt: number) {
      // Drift orbs
      for (const orb of orbs) {
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;
        // Soft bounce within [−0.05, 1.05]
        if (orb.x < -0.05 || orb.x > 1.05) orb.vx *= -1;
        if (orb.y < -0.05 || orb.y > 1.05) orb.vy *= -1;
      }

      // Advance particles
      if (!reduced) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x  += p.vx;
          p.y  += p.vy;
          p.life++;
          if (p.life >= p.maxLife || p.y < -15) {
            particles[i] = makeParticle(false);
          }
        }
      }
    }

    // ── Render loop ──────────────────────────────────────────────

    let raf = 0;
    let lastTs = 0;
    let elapsed = 0;
    const FPS_CAP = 1000 / 48; // cap at ~48 fps — smooth & light

    function frame(ts: number) {
      raf = requestAnimationFrame(frame);

      if (!visible) return;

      const dt = ts - lastTs;
      if (dt < FPS_CAP) return;
      lastTs = ts;
      elapsed += dt;

      const t = elapsed;

      update(dt);

      // ── Compose layers ──────────────────────────────────────
      drawBackground();
      drawOrbs(t);
      drawDustHaze(t);

      for (const band of BANDS) {
        drawBand(band, t);
      }

      if (!reduced) {
        drawEnergyStreaks(t);
        drawParticles();
      }

      drawVignette();
    }

    raf = requestAnimationFrame(frame);

    // ── Cleanup ──────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
