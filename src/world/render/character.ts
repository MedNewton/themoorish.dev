import { drawGlow } from './sky';
import { clamp } from './math';

const OUT = '#1a1026';
const CLOAK = '#c2502f';
const CLOAK_D = '#933c28';
const HOOD_L = '#ef8352';
const SKIN = '#f0c08e';
const SASH = '#2fbf9b';
const DARK = '#241836';
const LANT = '#ffd873';
const LANT_CORE = '#fff6d8';
const METAL = '#4a3a60';

export interface TravelerState {
  /** accumulated stride distance, drives the walk cycle */
  stride: number;
  /** smoothed speed in logical px/frame; ~0 means idle */
  speed: number;
  facing: 1 | -1;
  time: number;
}

interface Dust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
}

const dust: Dust[] = [];

export function spawnDust(x: number, y: number, dir: number, speed: number) {
  if (dust.length > 24) return;
  dust.push({
    x: x - dir * 3 + (Math.random() * 4 - 2),
    y: y - 1,
    vx: -dir * (0.2 + Math.random() * 0.3) * clamp(speed, 0, 3),
    vy: -(0.1 + Math.random() * 0.25),
    life: 0,
    max: 18 + Math.random() * 14,
  });
}

export function drawDust(ctx: CanvasRenderingContext2D, camDx: number) {
  for (let i = dust.length - 1; i >= 0; i--) {
    const d = dust[i];
    d.life++;
    d.x += d.vx - camDx;
    d.y += d.vy;
    d.vy *= 0.96;
    if (d.life > d.max) {
      dust.splice(i, 1);
      continue;
    }
    const a = 0.35 * (1 - d.life / d.max);
    ctx.fillStyle = `rgba(214,196,170,${a.toFixed(3)})`;
    const s = d.life < d.max * 0.4 ? 1 : 2;
    ctx.fillRect(Math.round(d.x), Math.round(d.y), s, s);
  }
}

/**
 * Draws the traveler. (x, footY) is the point between the feet on the ground.
 * Everything is drawn in whole logical pixels for crisp upscaling.
 */
export function drawTraveler(
  ctx: CanvasRenderingContext2D,
  x: number,
  footY: number,
  s: TravelerState,
) {
  const f = s.facing;
  const walking = s.speed > 0.06;
  const phase = s.stride * 0.18;
  const t = s.time;

  // walk bob: body dips on contact frames
  const bob = walking ? (Math.abs(Math.sin(phase)) > 0.6 ? 0 : 1) : 0;
  const breathe = !walking && Math.floor(t * 1.1) % 2 === 0 ? 1 : 0;
  const lift = bob;

  const px = (dx: number, dy: number, w: number, h: number, c: string) => {
    ctx.fillStyle = c;
    ctx.fillRect(Math.round(x + dx * f - (f === -1 ? w - 1 : 0)), Math.round(footY + dy), w, h);
  };

  /* legs */
  if (walking) {
    const aDx = Math.round(Math.sin(phase) * 3);
    const bDx = Math.round(Math.sin(phase + Math.PI) * 3);
    const aLift = Math.max(0, Math.round(Math.cos(phase) * 2));
    const bLift = Math.max(0, Math.round(Math.cos(phase + Math.PI) * 2));
    px(-2 + aDx, -6, 2, 6 - aLift, DARK);
    px(1 + bDx, -6, 2, 6 - bLift, DARK);
    // feet
    px(-2 + aDx, -1 - aLift, 3, 1, OUT);
    px(1 + bDx, -1 - bLift, 3, 1, OUT);
  } else {
    px(-2, -6, 2, 6, DARK);
    px(1, -6, 2, 6, DARK);
    px(-3, -1, 3, 1, OUT);
    px(1, -1, 3, 1, OUT);
  }

  /* cloak — flared, swings against stride */
  const sway = walking ? Math.round(Math.sin(phase + Math.PI / 2) * 1) : 0;
  const hemY = -7 - lift;
  // flare
  px(-5 + sway, hemY, 10, 2, CLOAK_D);
  px(-4, hemY - 3, 9, 3, CLOAK);
  px(-4, hemY - 6, 8, 3, CLOAK);
  // chest
  px(-3, hemY - 9 - breathe, 7, 3 + breathe, CLOAK);
  // back shading
  px(-4, hemY - 6, 2, 6, CLOAK_D);
  // sash
  px(-3, hemY - 5, 7, 2, SASH);
  px(3, hemY - 4, 1, 3, SASH);

  /* head + hood */
  const headY = hemY - 15 - breathe;
  px(-3, headY, 8, 6, CLOAK); // hood mass
  px(-3, headY - 1, 7, 2, HOOD_L); // rim light
  px(-4, headY + 2, 1, 4, CLOAK_D); // hood drape behind
  px(-4, headY + 6, 9, 1, CLOAK_D); // hood underside
  // face window
  px(0, headY + 2, 4, 3, SKIN);
  // eye (blinks every ~3s)
  const blink = Math.floor(t * 0.55) % 4 === 0 && (t * 0.55) % 1 < 0.18;
  if (!blink) px(2, headY + 3, 1, 1, OUT);

  /* scarf tail flutters when walking */
  if (walking) {
    const fl = Math.floor(t * 8) % 2;
    px(-5, headY + 4 + fl, 2, 1, SASH);
    px(-7, headY + 5 - fl, 2, 1, SASH);
  }

  /* staff + lantern (held forward) */
  const handY = hemY - 7;
  px(4, headY - 1, 1, -2 - (headY - 1), DARK); // staff shaft, hook to ground
  px(4, headY - 2, 3, 1, DARK); // hook
  // lantern swings: pendulum from walk or slow idle sway
  const swing = walking ? Math.sin(phase + Math.PI / 3) * 1.6 : Math.sin(t * 1.3) * 1;
  const lx = Math.round(x + (6 + swing) * f);
  const ly = Math.round(footY + headY + 0);
  ctx.fillStyle = METAL;
  ctx.fillRect(lx, ly, 3, 1);
  ctx.fillStyle = LANT;
  ctx.fillRect(lx, ly + 1, 3, 4);
  ctx.fillStyle = LANT_CORE;
  ctx.fillRect(lx + 1, ly + 2, 1, 2);
  ctx.fillStyle = METAL;
  ctx.fillRect(lx, ly + 5, 3, 1);
  const flicker = 0.55 + 0.18 * Math.sin(t * 7) + 0.08 * Math.sin(t * 13);
  drawGlow(ctx, lx + 1, ly + 3, 12, '#ffcf6e', flicker);
  // hand on staff
  px(4, handY, 2, 2, SKIN);
}

const CAMEL = '#8a6444';
const CAMEL_D = '#6b4c34';
const CAMEL_L = '#a37c52';

/**
 * The traveler's camel companion — trails a few steps behind, walks the
 * same stride at a lazy phase offset, and chews while waiting.
 */
export function drawCamel(
  ctx: CanvasRenderingContext2D,
  x: number,
  footY: number,
  s: TravelerState,
) {
  const f = s.facing;
  const walking = s.speed > 0.06;
  const phase = s.stride * 0.18 + 0.9; // off-beat from the traveler
  const t = s.time;
  const bob = walking ? (Math.abs(Math.sin(phase)) > 0.6 ? 0 : 1) : 0;
  const breathe = !walking && Math.floor(t * 0.9) % 2 === 0 ? 1 : 0;

  const px = (dx: number, dy: number, w: number, h: number, c: string) => {
    ctx.fillStyle = c;
    ctx.fillRect(Math.round(x + dx * f - (f === -1 ? w - 1 : 0)), Math.round(footY + dy), w, h);
  };

  /* legs: front and back pairs alternate */
  const legTop = -9 - bob;
  if (walking) {
    const aDx = Math.round(Math.sin(phase) * 2);
    const bDx = Math.round(Math.sin(phase + Math.PI) * 2);
    const aLift = Math.max(0, Math.round(Math.cos(phase) * 2));
    const bLift = Math.max(0, Math.round(Math.cos(phase + Math.PI) * 2));
    px(-9 + aDx, legTop, 2, 9 + bob - aLift, CAMEL_D);
    px(-5 + bDx, legTop, 2, 9 + bob - bLift, CAMEL_D);
    px(3 + bDx, legTop, 2, 9 + bob - bLift, CAMEL_D);
    px(7 + aDx, legTop, 2, 9 + bob - aLift, CAMEL_D);
  } else {
    px(-9, legTop, 2, 9, CAMEL_D);
    px(-5, legTop, 2, 9, CAMEL_D);
    px(3, legTop, 2, 9, CAMEL_D);
    px(7, legTop, 2, 9, CAMEL_D);
  }

  /* body + hump */
  const bodyY = -15 - bob;
  px(-11, bodyY, 21, 7, CAMEL);
  px(-11, bodyY, 21, 2, CAMEL_L);
  px(-3, bodyY - 3 - breathe, 8, 3 + breathe, CAMEL);
  px(-2, bodyY - 4 - breathe, 6, 1, CAMEL_L);
  // tail, swishes now and then
  const swish = Math.floor(t * 0.8) % 3 === 0 ? 1 : 0;
  px(-12, bodyY + 2, 1, 4 + swish, CAMEL_D);

  /* neck + head — chews when idle */
  const chew = !walking && Math.floor(t * 2.2) % 2 === 0 ? 1 : 0;
  px(8, bodyY - 5, 3, 7, CAMEL);
  px(9, bodyY - 8 + chew, 5, 4, CAMEL);
  px(13, bodyY - 7 + chew, 2, 2, CAMEL_D); // muzzle
  px(10, bodyY - 9 + chew, 1, 1, CAMEL_D); // ear
  px(11, bodyY - 7 + chew, 1, 1, OUT); // eye

  /* saddle blanket + cargo */
  px(-6, bodyY - 2, 9, 3, '#a8453a');
  px(-6, bodyY + 1, 9, 1, SASH);
  px(-5, bodyY - 4, 3, 2, '#4a3258'); // strapped pack
  px(1, bodyY - 4, 2, 2, '#ffd073');
}
