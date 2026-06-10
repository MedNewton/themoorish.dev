import { hash, hexToRgb, mixRgb, rgbStr, smoothstep, clamp01 } from './math';
import type { RGB } from './math';

/**
 * Sky color script for the whole journey.
 * Each stop: [progress, topColor, horizonColor].
 */
const SKY_STOPS: Array<[number, string, string]> = [
  [0.0, '#070617', '#241a4d'],
  [0.3, '#0a0820', '#2c1e58'],
  [0.55, '#100b2e', '#3d2360'],
  [0.72, '#1a1040', '#6e2f63'],
  [0.86, '#2a1a55', '#c25b4a'],
  [1.0, '#3d2a6e', '#f5a24f'],
];

interface SkyPair {
  top: RGB;
  horizon: RGB;
}

const stopsRgb = SKY_STOPS.map(([p, t, h]) => ({
  p,
  top: hexToRgb(t),
  horizon: hexToRgb(h),
}));

export function skyAt(progress: number): SkyPair {
  const p = clamp01(progress);
  let i = 0;
  while (i < stopsRgb.length - 2 && stopsRgb[i + 1].p < p) i++;
  const a = stopsRgb[i];
  const b = stopsRgb[i + 1];
  const t = clamp01((p - a.p) / (b.p - a.p));
  return {
    top: mixRgb(a.top, b.top, t),
    horizon: mixRgb(a.horizon, b.horizon, t),
  };
}

/** Banded pixel-style vertical gradient. */
export function drawSky(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  horizonY: number,
  progress: number,
) {
  const { top, horizon } = skyAt(progress);
  const bands = 28;
  const bandH = Math.ceil(horizonY / bands);
  for (let i = 0; i < bands; i++) {
    const t = i / (bands - 1);
    // ease toward horizon so the glow pools low
    const e = t * t * (3 - 2 * t);
    ctx.fillStyle = rgbStr(mixRgb(top, horizon, e));
    ctx.fillRect(0, i * bandH, w, bandH + 1);
  }
  // below horizon falls to terrain; fill with horizon tone as backstop
  ctx.fillStyle = rgbStr(horizon);
  ctx.fillRect(0, horizonY, w, h - horizonY);
}

interface Star {
  x: number;
  y: number;
  size: number;
  tw: number;
  ph: number;
}

const STARS: Star[] = [];
for (let i = 0; i < 140; i++) {
  STARS.push({
    x: hash(i * 3 + 1),
    y: hash(i * 3 + 2) * 0.85,
    size: hash(i * 3 + 3) > 0.86 ? 2 : 1,
    tw: 0.4 + hash(i * 7) * 1.6,
    ph: hash(i * 11) * Math.PI * 2,
  });
}

export function drawStars(
  ctx: CanvasRenderingContext2D,
  w: number,
  horizonY: number,
  camX: number,
  time: number,
  progress: number,
) {
  // stars dissolve as dawn breaks
  const visibility = 1 - smoothstep(0.72, 0.95, progress);
  if (visibility <= 0.01) return;
  const fieldW = w * 1.6;
  for (const s of STARS) {
    const sx = Math.floor(((s.x * fieldW - camX * 0.04) % fieldW + fieldW) % fieldW);
    if (sx > w) continue;
    const sy = Math.floor(s.y * horizonY);
    const twinkle = 0.55 + 0.45 * Math.sin(time * s.tw + s.ph);
    const a = visibility * twinkle * (0.45 + 0.55 * s.size * 0.5);
    ctx.fillStyle = `rgba(232,236,255,${a.toFixed(3)})`;
    ctx.fillRect(sx, sy, s.size, s.size);
  }

  // a shooting star every now and then
  const PERIOD = 8;
  const cycle = Math.floor(time / PERIOD);
  const ft = time - cycle * PERIOD;
  if (ft < 0.8 && hash(cycle) > 0.35) {
    const x0 = hash(cycle * 7) * w * 0.8 + w * 0.15;
    const y0 = hash(cycle * 13) * horizonY * 0.45 + 4;
    const px = Math.round(x0 - ft * 110);
    const py = Math.round(y0 + ft * 42);
    const fade = visibility * (1 - ft / 0.8);
    for (let i = 0; i < 7; i++) {
      ctx.fillStyle = `rgba(255,244,214,${(fade * (1 - i / 7)).toFixed(3)})`;
      ctx.fillRect(px + i * 2, py - i, i === 0 ? 2 : 1, 1);
    }
  }
}

/** Crescent moon that sets as the journey ends; sun rises at the gate. */
export function drawCelestials(
  ctx: CanvasRenderingContext2D,
  w: number,
  horizonY: number,
  progress: number,
  time: number,
) {
  // Moon: drifts down-left and fades by dawn
  const moonVis = 1 - smoothstep(0.7, 0.88, progress);
  if (moonVis > 0.02) {
    const mx = Math.floor(w * 0.74 - progress * w * 0.32);
    const my = Math.floor(horizonY * (0.18 + progress * 0.34));
    const r = 11;
    ctx.globalAlpha = moonVis;
    // halo
    ctx.fillStyle = 'rgba(244,240,220,0.07)';
    fillCircle(ctx, mx, my, r + 6);
    ctx.fillStyle = '#f4eede';
    fillCircle(ctx, mx, my, r);
    // crescent bite (sample sky behind would be ideal; use night tone)
    const { top } = skyAt(progress);
    ctx.fillStyle = rgbStr(top);
    fillCircle(ctx, mx - 5, my - 3, r - 2);
    // craters
    ctx.fillStyle = 'rgba(190,184,160,0.55)';
    ctx.fillRect(mx + 3, my + 4, 2, 2);
    ctx.fillRect(mx + 7, my - 1, 2, 1);
    ctx.globalAlpha = 1;
  }

  // Sun: rises in the final chapter
  const sunUp = smoothstep(0.86, 1, progress);
  if (sunUp > 0.02) {
    const sx = Math.floor(w * 0.62);
    const sy = Math.floor(horizonY + 16 - sunUp * (horizonY * 0.42 + 16));
    const r = 14;
    const pulse = 1 + Math.sin(time * 1.4) * 0.04;
    ctx.fillStyle = 'rgba(255,196,110,0.12)';
    fillCircle(ctx, sx, sy, Math.round((r + 12) * pulse));
    ctx.fillStyle = 'rgba(255,210,130,0.25)';
    fillCircle(ctx, sx, sy, r + 5);
    ctx.fillStyle = '#ffd98a';
    fillCircle(ctx, sx, sy, r);
    ctx.fillStyle = '#fff3cf';
    fillCircle(ctx, sx, sy, r - 5);
  }
}

export function fillCircle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
) {
  // chunky pixel circle: horizontal scanline spans
  for (let dy = -r; dy <= r; dy++) {
    const dx = Math.floor(Math.sqrt(r * r - dy * dy));
    ctx.fillRect(cx - dx, cy + dy, dx * 2 + 1, 1);
  }
}

/** Soft dithered glow (for lanterns, fires, neon). */
export function drawGlow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string,
  intensity: number,
) {
  const steps = 3;
  for (let i = steps; i >= 1; i--) {
    const rr = Math.round((r * i) / steps);
    ctx.globalAlpha = (intensity * 0.1 * (steps - i + 1)) / steps + 0.02;
    ctx.fillStyle = color;
    fillCircle(ctx, cx, cy, rr);
  }
  ctx.globalAlpha = 1;
}

export function dawnTint(progress: number): { color: string; alpha: number } {
  const t = smoothstep(0.78, 1, progress);
  return { color: '#ff9d4d', alpha: t * 0.1 };
}
