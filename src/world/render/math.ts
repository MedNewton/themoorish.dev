export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v;

export const clamp01 = (v: number) => clamp(v, 0, 1);

export const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

/** Deterministic pseudo-random in [0,1) from an integer seed. */
export function hash(n: number): number {
  let x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  x -= Math.floor(x);
  return x;
}

/** 1D value noise: smooth interpolation between hashed lattice points. */
export function noise1(x: number, seed = 0): number {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return lerp(hash(i + seed * 1000), hash(i + 1 + seed * 1000), u);
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function mixRgb(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
}

export const rgbStr = (c: RGB) => `rgb(${c.r},${c.g},${c.b})`;

/** Mix two hex colors, returning a CSS rgb() string. Cached per pair+step. */
const mixCache = new Map<string, string>();
export function mixHex(a: string, b: string, t: number): string {
  const q = Math.round(clamp01(t) * 32);
  const key = a + b + q;
  let out = mixCache.get(key);
  if (!out) {
    out = rgbStr(mixRgb(hexToRgb(a), hexToRgb(b), q / 32));
    mixCache.set(key, out);
  }
  return out;
}
