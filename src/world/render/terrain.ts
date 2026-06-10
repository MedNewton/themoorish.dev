import { noise1, mixHex, smoothstep } from './math';
import { skyAt } from './sky';
import { rgbStr, mixRgb, hexToRgb } from './math';
import { ZONE_LEN } from '../journey';

/**
 * Ground height (world units above the ground baseline) for the walkable layer.
 * The city zones (3,4) flatten into pavement; desert rolls gently.
 */
export function groundHeight(worldX: number): number {
  const zone = worldX / ZONE_LEN;
  const dune = (noise1(worldX / 90, 7) - 0.5) * 14 + (noise1(worldX / 33, 3) - 0.5) * 4;
  // flatten through the city + agent district
  const flat = smoothstep(2.6, 3.0, zone) * (1 - smoothstep(4.55, 5.0, zone));
  return dune * (1 - flat);
}

interface LayerSpec {
  parallax: number;
  amp: number;
  freq: number;
  seed: number;
  /** vertical offset above the walk line (positive = higher hills behind) */
  lift: number;
  darken: string;
}

const FAR: LayerSpec = { parallax: 0.12, amp: 26, freq: 150, seed: 11, lift: 46, darken: '#0d0a24' };
const MID: LayerSpec = { parallax: 0.38, amp: 20, freq: 110, seed: 23, lift: 24, darken: '#120d2e' };

function drawDuneLayer(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  groundY: number,
  camX: number,
  spec: LayerSpec,
  progress: number,
) {
  const { horizon } = skyAt(progress);
  // silhouettes pick up the horizon glow as dawn approaches
  const base = mixRgb(hexToRgb(spec.darken), horizon, 0.16 + progress * 0.1);
  ctx.fillStyle = rgbStr(base);
  const off = camX * spec.parallax;
  for (let x = 0; x <= w; x++) {
    const wx = x + off;
    const y =
      groundY -
      spec.lift -
      (noise1(wx / spec.freq, spec.seed) - 0.3) * spec.amp -
      (noise1(wx / (spec.freq * 0.37), spec.seed + 5) - 0.5) * spec.amp * 0.3;
    ctx.fillRect(x, Math.floor(y), 1, h - Math.floor(y));
  }
}

export function drawFarLayer(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  groundY: number,
  camX: number,
  progress: number,
) {
  drawDuneLayer(ctx, w, h, groundY, camX, FAR, progress);
}

export function drawMidLayer(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  groundY: number,
  camX: number,
  progress: number,
) {
  drawDuneLayer(ctx, w, h, groundY, camX, MID, progress);
}

/** Walkable foreground ground strip with subtle texture. */
export function drawGround(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  groundY: number,
  camX: number,
  progress: number,
) {
  const topCol = mixHex('#241a44', '#6b4a3c', smoothstep(0.75, 1, progress) * 0.8);
  const deepCol = mixHex('#16102e', '#3c2a30', smoothstep(0.75, 1, progress) * 0.8);

  for (let x = 0; x <= w; x++) {
    const wx = x + camX;
    const y = Math.floor(groundY - groundHeight(wx));
    ctx.fillStyle = topCol;
    ctx.fillRect(x, y, 1, 3);
    ctx.fillStyle = deepCol;
    ctx.fillRect(x, y + 3, 1, h - y - 3);
  }

  // speckle texture (deterministic per world position)
  ctx.fillStyle = 'rgba(255,255,255,0.045)';
  const startCell = Math.floor(camX / 7);
  for (let i = 0; i <= Math.ceil(w / 7) + 1; i++) {
    const cell = startCell + i;
    const n = noise1(cell * 0.91, 31);
    if (n > 0.45) {
      const sx = cell * 7 - camX + Math.floor(n * 5);
      const sy = Math.floor(groundY - groundHeight(cell * 7) + 5 + n * 16);
      if (sy < h) ctx.fillRect(Math.floor(sx), sy, 1, 1);
    }
  }
}
