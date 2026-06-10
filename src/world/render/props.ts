import { hash, noise1, smoothstep } from './math';
import { drawGlow, fillCircle, skyAt } from './sky';
import { rgbStr, mixRgb, hexToRgb } from './math';
import { groundHeight } from './terrain';
import { ZONE_LEN } from '../journey';

type Draw = (
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  t: number,
  progress: number,
) => void;

interface Prop {
  x: number;
  draw: Draw;
  /** approximate half-width for culling */
  cull: number;
}

const P = (ctx: CanvasRenderingContext2D, c: string) => (ctx.fillStyle = c);

/* ---------------------------------- flora ---------------------------------- */

function palm(variant: number): Draw {
  const lean = (hash(variant) - 0.5) * 4;
  const height = 26 + Math.floor(hash(variant * 3) * 14);
  return (ctx, sx, sy, t) => {
    const sway = Math.sin(t * 0.9 + variant) * 1.2;
    P(ctx, '#241836');
    // trunk: stacked segments leaning
    for (let i = 0; i < height; i += 2) {
      const k = i / height;
      const x = Math.round(sx + lean * k + sway * k * k);
      ctx.fillRect(x, sy - i - 2, 2, 2);
    }
    const topX = Math.round(sx + lean + sway);
    const topY = sy - height - 2;
    // fronds
    P(ctx, '#2a4438');
    const fronds = [
      [-9, -2], [9, -2], [-7, -5], [7, -5], [-3, -7], [3, -7], [0, -8],
    ];
    for (const [dx, dy] of fronds) {
      const steps = 5;
      for (let s = 0; s < steps; s++) {
        const k = s / steps;
        const fx = Math.round(topX + dx * k + sway * k);
        const fy = Math.round(topY + dy * k + k * k * 4);
        ctx.fillRect(fx, fy, 2, 1);
      }
    }
    P(ctx, '#39584a');
    ctx.fillRect(topX - 1, topY - 2, 3, 2);
  };
}

function tuft(seed: number): Draw {
  return (ctx, sx, sy, t) => {
    P(ctx, '#2c2347');
    const sway = Math.round(Math.sin(t * 1.4 + seed) * 1);
    ctx.fillRect(sx, sy - 3, 1, 3);
    ctx.fillRect(sx + 2, sy - 4, 1, 4);
    ctx.fillRect(sx + 2 + sway, sy - 5, 1, 1);
    ctx.fillRect(sx + 4, sy - 2, 1, 2);
  };
}

function rock(seed: number): Draw {
  const w = 4 + Math.floor(hash(seed) * 6);
  return (ctx, sx, sy) => {
    P(ctx, '#1d1538');
    ctx.fillRect(sx, sy - Math.ceil(w / 2), w, Math.ceil(w / 2));
    ctx.fillRect(sx + 1, sy - Math.ceil(w / 2) - 1, w - 2, 1);
    P(ctx, '#2c2150');
    ctx.fillRect(sx + 1, sy - Math.ceil(w / 2), 2, 1);
  };
}

/* ---------------------------------- camp ----------------------------------- */

function tent(variant: number): Draw {
  const w = 26 + Math.floor(hash(variant * 7) * 10);
  const h = 14 + Math.floor(hash(variant * 13) * 5);
  return (ctx, sx, sy) => {
    // canvas body
    P(ctx, '#5e3042');
    for (let i = 0; i < h; i++) {
      const rowW = Math.round((w * i) / h);
      ctx.fillRect(sx - Math.floor(rowW / 2), sy - h + i, rowW, 1);
    }
    // stripes
    P(ctx, '#7a4252');
    for (let i = 2; i < h; i += 4) {
      const rowW = Math.round((w * i) / h);
      ctx.fillRect(sx - Math.floor(rowW / 2), sy - h + i, rowW, 1);
    }
    // entrance
    P(ctx, '#160f28');
    ctx.fillRect(sx - 3, sy - 6, 6, 6);
    // pole tip + pennant
    P(ctx, '#241836');
    ctx.fillRect(sx, sy - h - 4, 1, 4);
    P(ctx, '#3ec6a8');
    ctx.fillRect(sx + 1, sy - h - 4, 4, 2);
  };
}

function campfire(): Draw {
  return (ctx, sx, sy, t) => {
    // logs
    P(ctx, '#3a2418');
    ctx.fillRect(sx - 5, sy - 2, 10, 2);
    ctx.fillRect(sx - 3, sy - 3, 6, 1);
    // animated flame, 3 stacked tongues
    const f = Math.floor(t * 8) % 3;
    const flicker = Math.sin(t * 11) * 1;
    P(ctx, '#ff7b33');
    ctx.fillRect(sx - 3, sy - 7, 6, 4);
    P(ctx, '#ffb84d');
    ctx.fillRect(sx - 2, sy - 9 - f, 4, 5 + f);
    P(ctx, '#ffe9a3');
    ctx.fillRect(sx - 1, sy - 7 - f, 2, 3);
    drawGlow(ctx, sx, sy - 6, 22 + Math.round(flicker * 2), '#ff9d4d', 0.85);
    // embers
    for (let i = 0; i < 4; i++) {
      const e = (t * (0.5 + hash(i) * 0.4) + hash(i * 5)) % 1;
      const ex = sx + Math.round(Math.sin((t + i) * 2.1) * (2 + i));
      const ey = sy - 8 - Math.round(e * 16);
      ctx.globalAlpha = 1 - e;
      P(ctx, '#ffcf6e');
      ctx.fillRect(ex, ey, 1, 1);
      ctx.globalAlpha = 1;
    }
  };
}

function camel(): Draw {
  return (ctx, sx, sy, t) => {
    const breathe = Math.floor(t * 1.2) % 2;
    P(ctx, '#241836');
    // body (sitting)
    ctx.fillRect(sx - 10, sy - 8 - breathe * 0, 20, 6);
    ctx.fillRect(sx - 12, sy - 4, 24, 4);
    // hump
    ctx.fillRect(sx - 4, sy - 11 - breathe, 8, 4);
    // neck + head
    ctx.fillRect(sx + 9, sy - 13, 3, 8);
    ctx.fillRect(sx + 9, sy - 15, 6, 4);
    ctx.fillRect(sx + 13, sy - 14, 3, 2);
    // ear
    ctx.fillRect(sx + 10, sy - 16, 1, 1);
    // saddle blanket
    P(ctx, '#a8453a');
    ctx.fillRect(sx - 5, sy - 9 - breathe, 10, 2);
    P(ctx, '#3ec6a8');
    ctx.fillRect(sx - 5, sy - 7 - breathe, 10, 1);
  };
}

/* --------------------------------- bazaar ---------------------------------- */

function pool(width: number): Draw {
  return (ctx, sx, sy, t, progress) => {
    const { horizon } = skyAt(progress);
    const water = mixRgb(hexToRgb('#1b3a55'), horizon, 0.35);
    P(ctx, rgbStr(water));
    ctx.fillRect(sx, sy - 1, width, 4);
    P(ctx, rgbStr(mixRgb(water, hexToRgb('#ffffff'), 0.25)));
    // shimmer: moving highlights
    for (let i = 0; i < Math.floor(width / 9); i++) {
      const ph = (t * (0.6 + hash(i) * 0.7) + hash(i * 3)) % 1;
      const hx = sx + Math.floor(ph * width);
      ctx.fillRect(hx, sy - 1 + (i % 3), 3 + (i % 2) * 2, 1);
    }
    // banks
    P(ctx, '#241a44');
    ctx.fillRect(sx - 3, sy - 1, 4, 2);
    ctx.fillRect(sx + width - 1, sy - 1, 4, 2);
  };
}

function stall(variant: number): Draw {
  const w = 22;
  const stripe = variant % 2 === 0 ? '#3ec6a8' : '#c2502f';
  return (ctx, sx, sy, t) => {
    // legs
    P(ctx, '#241836');
    ctx.fillRect(sx - Math.floor(w / 2), sy - 14, 2, 14);
    ctx.fillRect(sx + Math.floor(w / 2) - 2, sy - 14, 2, 14);
    // counter
    ctx.fillRect(sx - Math.floor(w / 2), sy - 8, w, 3);
    // goods
    P(ctx, '#ffd073');
    ctx.fillRect(sx - 7, sy - 10, 3, 2);
    P(ctx, '#a8453a');
    ctx.fillRect(sx - 2, sy - 10, 4, 2);
    P(ctx, '#6e5aa8');
    ctx.fillRect(sx + 4, sy - 10, 3, 2);
    // awning, striped, gentle ripple
    const ripple = Math.floor(t * 3) % 2;
    for (let i = 0; i < w + 6; i += 3) {
      P(ctx, (i / 3) % 2 === 0 ? stripe : '#e8e0d0');
      ctx.fillRect(sx - Math.floor(w / 2) - 3 + i, sy - 17 + ((i / 3) % 2 === 0 ? ripple : 0), 3, 3);
    }
  };
}

function lanternString(span: number): Draw {
  return (ctx, sx, sy, t) => {
    // poles
    P(ctx, '#241836');
    ctx.fillRect(sx, sy - 30, 2, 30);
    ctx.fillRect(sx + span, sy - 30, 2, 30);
    // sagging wire
    const n = 7;
    for (let i = 0; i <= n; i++) {
      const k = i / n;
      const wx = Math.round(sx + 1 + k * span);
      const wy = Math.round(sy - 29 + Math.sin(Math.PI * k) * 5);
      P(ctx, '#241836');
      ctx.fillRect(wx, wy, Math.ceil(span / n), 1);
      if (i > 0 && i < n && i % 2 === 1) {
        const sway = Math.round(Math.sin(t * 1.6 + i) * 1);
        const colors = ['#ffd073', '#3ec6a8', '#ff8a5c'];
        const c = colors[i % colors.length];
        P(ctx, '#241836');
        ctx.fillRect(wx + sway, wy + 1, 1, 2);
        P(ctx, c);
        ctx.fillRect(wx - 1 + sway, wy + 3, 3, 4);
        P(ctx, '#fff3cf');
        ctx.fillRect(wx + sway, wy + 4, 1, 2);
        drawGlow(ctx, wx + sway, wy + 5, 7, c, 0.5 + 0.2 * Math.sin(t * 3 + i));
      }
    }
  };
}

/* ----------------------------------- city ---------------------------------- */

function building(seed: number, w: number, h: number, accent: string): Draw {
  const litMask: boolean[] = [];
  for (let i = 0; i < 60; i++) litMask.push(hash(seed * 100 + i) > 0.42);
  return (ctx, sx, sy, t) => {
    // body
    P(ctx, '#191236');
    ctx.fillRect(sx, sy - h, w, h);
    P(ctx, '#221a48');
    ctx.fillRect(sx, sy - h, 3, h);
    // crenellated roofline (Moorish)
    P(ctx, '#191236');
    for (let x = 0; x < w; x += 4) ctx.fillRect(sx + x, sy - h - 3, 2, 3);
    // arched doorway
    P(ctx, '#0e0a20');
    const dx = sx + Math.floor(w / 2) - 3;
    ctx.fillRect(dx, sy - 8, 6, 8);
    ctx.fillRect(dx + 1, sy - 10, 4, 2);
    ctx.fillRect(dx + 2, sy - 11, 2, 1);
    // windows: arch-topped, some lit, occasional flicker
    let wi = 0;
    for (let yy = sy - h + 6; yy < sy - 14; yy += 9) {
      for (let xx = sx + 4; xx < sx + w - 5; xx += 8) {
        const lit = litMask[wi % litMask.length];
        const flick = hash(seed + wi * 7) > 0.93 && Math.floor(t * 6 + wi) % 7 === 0;
        P(ctx, lit && !flick ? '#ffd073' : '#241a44');
        ctx.fillRect(xx, yy + 1, 3, 4);
        ctx.fillRect(xx + 1, yy, 1, 1);
        wi++;
      }
    }
    // accent trim + antenna beacon
    P(ctx, accent);
    ctx.fillRect(sx, sy - h - 1, w, 1);
    if (hash(seed * 3) > 0.5) {
      P(ctx, '#241836');
      ctx.fillRect(sx + Math.floor(w / 2), sy - h - 9, 1, 6);
      const on = Math.floor(t * 1.5 + seed) % 2 === 0;
      P(ctx, on ? '#ff5c5c' : '#5c2030');
      ctx.fillRect(sx + Math.floor(w / 2) - 1, sy - h - 11, 3, 2);
      if (on) drawGlow(ctx, sx + Math.floor(w / 2), sy - h - 10, 5, '#ff5c5c', 0.5);
    }
  };
}

function neonSign(text: 'DEFI' | 'RWA' | 'NFT' | 'DAPP', color: string, height: number): Draw {
  // tiny 3x5 pixel glyphs
  const glyphs: Record<string, number[]> = {
    D: [0b110, 0b101, 0b101, 0b101, 0b110],
    E: [0b111, 0b100, 0b110, 0b100, 0b111],
    F: [0b111, 0b100, 0b110, 0b100, 0b100],
    I: [0b111, 0b010, 0b010, 0b010, 0b111],
    R: [0b110, 0b101, 0b110, 0b101, 0b101],
    W: [0b101, 0b101, 0b101, 0b111, 0b101],
    A: [0b010, 0b101, 0b111, 0b101, 0b101],
    N: [0b101, 0b111, 0b111, 0b111, 0b101],
    T: [0b111, 0b010, 0b010, 0b010, 0b010],
    P: [0b110, 0b101, 0b110, 0b100, 0b100],
  };
  return (ctx, sx, sy, t) => {
    const y = sy - height;
    const wTotal = text.length * 4 + 3;
    // flicker: occasionally the whole sign dips
    const dip = Math.floor(t * 2.3) % 9 === 0;
    // backboard + post
    P(ctx, '#241836');
    ctx.fillRect(sx + Math.floor(wTotal / 2), y + 7, 1, height - 7);
    P(ctx, '#0e0a20');
    ctx.fillRect(sx - 2, y - 2, wTotal + 3, 9);
    ctx.globalAlpha = dip ? 0.35 : 1;
    P(ctx, color);
    text.split('').forEach((ch, i) => {
      const g = glyphs[ch];
      for (let r = 0; r < 5; r++)
        for (let c = 0; c < 3; c++)
          if (g[r] & (1 << (2 - c))) ctx.fillRect(sx + i * 4 + c, y + r, 1, 1);
    });
    ctx.globalAlpha = 1;
    if (!dip) drawGlow(ctx, sx + Math.floor(wTotal / 2), y + 2, 10, color, 0.55);
  };
}

/* ------------------------------ agent district ------------------------------ */

function robot(): Draw {
  return (ctx, sx, sy, t) => {
    const hover = Math.round(Math.sin(t * 2.2) * 2) - 6;
    const y = sy + hover;
    // shadow
    ctx.globalAlpha = 0.25 + 0.1 * Math.sin(t * 2.2);
    P(ctx, '#000000');
    ctx.fillRect(sx - 3, sy - 1, 8, 1);
    ctx.globalAlpha = 1;
    // body
    P(ctx, '#2c2150');
    ctx.fillRect(sx - 4, y - 10, 9, 8);
    P(ctx, '#443573');
    ctx.fillRect(sx - 4, y - 10, 9, 2);
    // eye: blinks, scans
    const blink = Math.floor(t * 0.7) % 5 === 0;
    P(ctx, blink ? '#1a4438' : '#4dffd2');
    const scan = Math.round(Math.sin(t * 1.3) * 2);
    ctx.fillRect(sx - 2 + scan, y - 8, 4, 2);
    if (!blink) drawGlow(ctx, sx + scan, y - 7, 5, '#4dffd2', 0.5);
    // antenna
    P(ctx, '#443573');
    ctx.fillRect(sx, y - 13, 1, 3);
    P(ctx, '#ff8a5c');
    ctx.fillRect(sx - 1, y - 14, 3, 1);
  };
}

function drone(seed: number): Draw {
  const baseH = 26 + Math.floor(hash(seed) * 18);
  return (ctx, sx, sy, t) => {
    const bobX = Math.round(Math.sin(t * 0.7 + seed) * 6);
    const bobY = Math.round(Math.sin(t * 1.9 + seed * 2) * 3);
    const x = sx + bobX;
    const y = sy - baseH + bobY;
    P(ctx, '#2c2150');
    ctx.fillRect(x - 3, y, 7, 3);
    P(ctx, '#443573');
    ctx.fillRect(x - 5, y - 1, 3, 1);
    ctx.fillRect(x + 3, y - 1, 3, 1);
    const on = Math.floor(t * 4 + seed) % 2 === 0;
    P(ctx, on ? '#4dffd2' : '#2a6e5e');
    ctx.fillRect(x, y + 1, 1, 1);
    // beam scanning the ground occasionally
    if (Math.floor(t * 0.5 + seed) % 4 === 0) {
      ctx.globalAlpha = 0.08;
      P(ctx, '#4dffd2');
      for (let i = 0; i < baseH - 4; i++) {
        const spread = Math.floor((i / baseH) * 5);
        ctx.fillRect(x - spread, y + 3 + i + bobY * -1, spread * 2 + 1, 1);
      }
      ctx.globalAlpha = 1;
    }
  };
}

function obelisk(seed: number): Draw {
  const h = 30 + Math.floor(hash(seed * 9) * 16);
  return (ctx, sx, sy, t) => {
    P(ctx, '#191236');
    ctx.fillRect(sx, sy - h, 10, h);
    P(ctx, '#221a48');
    ctx.fillRect(sx, sy - h, 2, h);
    // server lights
    for (let i = 0; i < Math.floor(h / 6); i++) {
      const on = (Math.floor(t * 3) + i * 2 + seed) % 5 !== 0;
      P(ctx, on ? (i % 3 === 0 ? '#ff8a5c' : '#4dffd2') : '#241a44');
      ctx.fillRect(sx + 6, sy - h + 3 + i * 6, 2, 1);
    }
    P(ctx, '#4dffd2');
    ctx.fillRect(sx - 1, sy - h - 1, 12, 1);
    drawGlow(ctx, sx + 5, sy - h, 6, '#4dffd2', 0.35);
  };
}

/* -------------------------------- sunrise gate ------------------------------ */

function gate(): Draw {
  return (ctx, sx, sy, t, progress) => {
    const W = 56;
    const H = 64;
    const glow = smoothstep(0.86, 1, progress);
    // pillars
    P(ctx, '#2a1c4e');
    ctx.fillRect(sx - W / 2, sy - H, 10, H);
    ctx.fillRect(sx + W / 2 - 10, sy - H, 10, H);
    P(ctx, '#3a2a66');
    ctx.fillRect(sx - W / 2, sy - H, 3, H);
    ctx.fillRect(sx + W / 2 - 10, sy - H, 3, H);
    // horseshoe arch
    P(ctx, '#2a1c4e');
    ctx.fillRect(sx - W / 2, sy - H - 8, W, 8);
    for (let i = 0; i < 7; i++) {
      ctx.fillRect(sx - W / 2 + 10 - i, sy - H + i * 2, 4 + i, 2);
      ctx.fillRect(sx + W / 2 - 14 + i - (4 + i) + 4, sy - H + i * 2, 4 + i, 2);
    }
    // crenellation + finials
    for (let x = -W / 2; x < W / 2; x += 5) {
      ctx.fillRect(sx + x, sy - H - 11, 3, 3);
    }
    P(ctx, '#ffd073');
    ctx.fillRect(sx - W / 2 + 3, sy - H - 14, 2, 3);
    ctx.fillRect(sx + W / 2 - 5, sy - H - 14, 2, 3);
    // zellige band
    P(ctx, '#3ec6a8');
    for (let x = -W / 2 + 1; x < W / 2 - 1; x += 4) ctx.fillRect(sx + x, sy - H - 6, 2, 2);
    // light through the arch — the journey's destination
    ctx.globalAlpha = 0.25 + 0.55 * glow + 0.05 * Math.sin(t * 2);
    P(ctx, '#ffd98a');
    ctx.fillRect(sx - W / 2 + 12, sy - H + 12, W - 24, H - 12);
    ctx.fillRect(sx - W / 2 + 15, sy - H + 6, W - 30, 6);
    ctx.globalAlpha = 1;
    drawGlow(ctx, sx, sy - H / 2, 30, '#ffd98a', 0.2 + glow * 0.7);
  };
}

function signpost(): Draw {
  return (ctx, sx, sy, t) => {
    P(ctx, '#241836');
    ctx.fillRect(sx, sy - 22, 2, 22);
    P(ctx, '#3a2a55');
    ctx.fillRect(sx - 8, sy - 21, 18, 6);
    ctx.fillRect(sx - 5, sy - 13, 15, 6);
    P(ctx, '#ffd073');
    // arrow notches
    ctx.fillRect(sx + 10, sy - 19, 2, 2);
    ctx.fillRect(sx - 7, sy - 11, 2, 2);
    const on = Math.floor(t * 2) % 4 !== 0;
    if (on) {
      P(ctx, '#ffd073');
      ctx.fillRect(sx - 6, sy - 19, 8, 2);
      ctx.fillRect(sx - 2, sy - 11, 8, 2);
    }
  };
}

/** Pixel birds at dawn. */
function birds(seed: number): Draw {
  return (ctx, sx, sy, t, progress) => {
    const vis = smoothstep(0.82, 0.95, progress);
    if (vis < 0.05) return;
    ctx.globalAlpha = vis;
    P(ctx, '#1a1233');
    for (let i = 0; i < 4; i++) {
      const ph = t * 0.35 + hash(seed + i) * 10;
      const bx = sx + Math.round((ph % 1) * 120) - 60 + i * 14;
      const by = sy - 70 - Math.round(Math.sin(ph * 6 + i) * 4) - i * 6;
      const flap = Math.floor(t * 6 + i) % 2;
      ctx.fillRect(bx - 2, by + (flap ? 0 : -1), 2, 1);
      ctx.fillRect(bx + 1, by + (flap ? 0 : -1), 2, 1);
      ctx.fillRect(bx, by, 1, 1);
    }
    ctx.globalAlpha = 1;
  };
}

/* ------------------------------ world placement ----------------------------- */

const Z = (zone: number, off: number) => zone * ZONE_LEN + off;

export const NEAR_PROPS: Prop[] = [
  // CH.01 — desert of origins
  { x: Z(0, 120), draw: palm(1), cull: 24 },
  { x: Z(0, 350), draw: tent(1), cull: 24 },
  { x: Z(0, 410), draw: campfire(), cull: 30 },
  { x: Z(0, 520), draw: palm(2), cull: 24 },
  { x: Z(0, 660), draw: rock(2), cull: 12 },

  // CH.02 — caravan camp
  { x: Z(1, 90), draw: palm(3), cull: 24 },
  { x: Z(1, 200), draw: tent(2), cull: 26 },
  { x: Z(1, 300), draw: campfire(), cull: 30 },
  { x: Z(1, 400), draw: camel(), cull: 30 },
  { x: Z(1, 480), draw: tent(3), cull: 26 },
  { x: Z(1, 620), draw: rock(5), cull: 12 },
  { x: Z(1, 700), draw: palm(4), cull: 24 },

  // CH.03 — oasis bazaar
  { x: Z(2, 60), draw: palm(5), cull: 24 },
  { x: Z(2, 110), draw: pool(90), cull: 100 },
  { x: Z(2, 230), draw: palm(6), cull: 24 },
  { x: Z(2, 260), draw: palm(7), cull: 24 },
  { x: Z(2, 380), draw: lanternString(150), cull: 160 },
  { x: Z(2, 420), draw: stall(1), cull: 20 },
  { x: Z(2, 500), draw: stall(2), cull: 20 },
  { x: Z(2, 640), draw: palm(8), cull: 24 },

  // CH.04 — city of shipped things
  { x: Z(3, 30), draw: building(1, 42, 64, '#3ec6a8'), cull: 50 },
  { x: Z(3, 95), draw: building(2, 34, 88, '#ff8a5c'), cull: 44 },
  { x: Z(3, 110), draw: neonSign('DEFI', '#4dffd2', 70), cull: 30 },
  { x: Z(3, 175), draw: building(3, 50, 72, '#ffd073'), cull: 56 },
  { x: Z(3, 260), draw: building(4, 38, 100, '#3ec6a8'), cull: 48 },
  { x: Z(3, 280), draw: neonSign('RWA', '#ffd073', 84), cull: 26 },
  { x: Z(3, 350), draw: building(5, 30, 58, '#ff8a5c'), cull: 40 },
  { x: Z(3, 430), draw: building(6, 46, 92, '#4dffd2'), cull: 52 },
  { x: Z(3, 450), draw: neonSign('DAPP', '#ff8a5c', 76), cull: 30 },
  { x: Z(3, 540), draw: building(7, 36, 70, '#ffd073'), cull: 46 },
  { x: Z(3, 600), draw: neonSign('NFT', '#b78aff', 56), cull: 26 },
  { x: Z(3, 640), draw: building(8, 44, 82, '#3ec6a8'), cull: 50 },

  // CH.05 — agent district
  { x: Z(4, 60), draw: obelisk(1), cull: 16 },
  { x: Z(4, 140), draw: drone(1), cull: 20 },
  { x: Z(4, 220), draw: obelisk(2), cull: 16 },
  { x: Z(4, 320), draw: robot(), cull: 16 },
  { x: Z(4, 380), draw: drone(2), cull: 20 },
  { x: Z(4, 460), draw: obelisk(3), cull: 16 },
  { x: Z(4, 560), draw: drone(3), cull: 20 },
  { x: Z(4, 620), draw: obelisk(4), cull: 16 },

  // CH.06 — sunrise gate
  { x: Z(5, 80), draw: signpost(), cull: 16 },
  { x: Z(5, 160), draw: palm(9), cull: 24 },
  { x: Z(5, 300), draw: birds(1), cull: 80 },
  { x: Z(5, 420), draw: gate(), cull: 40 },
  { x: Z(5, 560), draw: palm(10), cull: 24 },
];

// scattered ground detail everywhere
for (let i = 0; i < 90; i++) {
  const x = hash(i * 17 + 5) * ZONE_LEN * 6;
  const kind = hash(i * 29);
  NEAR_PROPS.push({
    x,
    draw: kind > 0.6 ? tuft(i) : rock(i + 50),
    cull: 10,
  });
}
NEAR_PROPS.sort((a, b) => a.x - b.x);

export function drawNearProps(
  ctx: CanvasRenderingContext2D,
  w: number,
  groundY: number,
  camX: number,
  t: number,
  progress: number,
) {
  for (const p of NEAR_PROPS) {
    const sx = Math.round(p.x - camX);
    if (sx < -p.cull * 2 || sx > w + p.cull * 2) continue;
    const sy = Math.floor(groundY - groundHeight(p.x));
    p.draw(ctx, sx, sy, t, progress);
  }
}

/* ------------------------- mid-layer silhouettes ---------------------------- */

interface MidProp {
  x: number;
  kind: 'kasbah' | 'tower' | 'dome';
  w: number;
  h: number;
}

const MID_PROPS: MidProp[] = [
  { x: Z(1, 560), kind: 'kasbah', w: 30, h: 34 },
  { x: Z(2, 180), kind: 'dome', w: 26, h: 24 },
  { x: Z(2, 700), kind: 'kasbah', w: 28, h: 30 },
  { x: Z(3, -60), kind: 'tower', w: 18, h: 60 },
  { x: Z(3, 60), kind: 'tower', w: 22, h: 84 },
  { x: Z(3, 160), kind: 'dome', w: 30, h: 40 },
  { x: Z(3, 240), kind: 'tower', w: 16, h: 96 },
  { x: Z(3, 330), kind: 'tower', w: 24, h: 70 },
  { x: Z(3, 420), kind: 'dome', w: 26, h: 36 },
  { x: Z(3, 520), kind: 'tower', w: 20, h: 104 },
  { x: Z(3, 610), kind: 'tower', w: 18, h: 78 },
  { x: Z(3, 720), kind: 'kasbah', w: 32, h: 44 },
  { x: Z(4, 100), kind: 'tower', w: 20, h: 88 },
  { x: Z(4, 260), kind: 'tower', w: 16, h: 66 },
  { x: Z(4, 480), kind: 'tower', w: 22, h: 92 },
  { x: Z(5, 40), kind: 'kasbah', w: 28, h: 30 },
];

const MID_PARALLAX = 0.38;
const MID_LIFT = 24;

export function drawMidProps(
  ctx: CanvasRenderingContext2D,
  w: number,
  groundY: number,
  camX: number,
  _t: number,
  progress: number,
) {
  const { horizon } = skyAt(progress);
  const sil = rgbStr(mixRgb(hexToRgb('#120d2e'), horizon, 0.16 + progress * 0.1));
  for (const p of MID_PROPS) {
    const sx = Math.round(p.x * MID_PARALLAX - camX * MID_PARALLAX);
    if (sx < -p.w - 20 || sx > w + p.w + 20) continue;
    const base = Math.floor(
      groundY - MID_LIFT + 6 - (noise1((sx + camX * MID_PARALLAX) / 110, 23) - 0.3) * 20,
    );
    ctx.fillStyle = sil;
    const half = Math.floor(p.w / 2);
    if (p.kind === 'kasbah') {
      ctx.fillRect(sx - half, base - p.h, p.w, p.h + 20);
      for (let x = -half; x < half; x += 4) ctx.fillRect(sx + x, base - p.h - 3, 2, 3);
      ctx.fillRect(sx - half - 4, base - Math.floor(p.h * 0.6), 4, Math.floor(p.h * 0.6) + 20);
      ctx.fillRect(sx + half, base - Math.floor(p.h * 0.5), 4, Math.floor(p.h * 0.5) + 20);
    } else if (p.kind === 'dome') {
      ctx.fillRect(sx - half, base - p.h + 8, p.w, p.h - 8 + 20);
      fillCircle(ctx, sx, base - p.h + 9, half);
      ctx.fillRect(sx, base - p.h - 3, 1, 4);
    } else {
      ctx.fillRect(sx - half, base - p.h, p.w, p.h + 20);
      for (let x = -half; x < half; x += 4) ctx.fillRect(sx + x, base - p.h - 2, 2, 2);
      // faint lit windows even in silhouette
      ctx.fillStyle = 'rgba(255,208,115,0.32)';
      for (let yy = base - p.h + 6; yy < base - 10; yy += 10) {
        for (let xx = sx - half + 3; xx < sx + half - 3; xx += 7) {
          if (hash(xx * 13 + yy * 7) > 0.5) ctx.fillRect(xx, yy, 2, 3);
        }
      }
      ctx.fillStyle = sil;
    }
  }
}
