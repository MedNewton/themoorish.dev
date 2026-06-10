import { drawSky, drawStars, drawCelestials, dawnTint } from './sky';
import { drawFarLayer, drawMidLayer, drawGround, groundHeight } from './terrain';
import { drawNearProps, drawMidProps } from './props';
import { drawTraveler, drawDust, spawnDust } from './character';
import type { TravelerState } from './character';
import { TRAVELER_SCREEN_X } from '../journey';

export interface FrameInput {
  w: number;
  h: number;
  camX: number;
  camDx: number;
  time: number;
  /** global journey progress 0..1 */
  progress: number;
  traveler: TravelerState;
  reducedMotion: boolean;
}

export function renderWorld(ctx: CanvasRenderingContext2D, f: FrameInput) {
  const { w, h, camX, time, progress } = f;
  const groundY = Math.floor(h * 0.84);
  const horizonY = groundY - 34;

  drawSky(ctx, w, h, horizonY, progress);
  drawStars(ctx, w, horizonY, camX, time, progress);
  drawCelestials(ctx, w, horizonY, progress, time);
  drawFarLayer(ctx, w, h, groundY, camX, progress);
  drawMidLayer(ctx, w, h, groundY, camX, progress);
  drawMidProps(ctx, w, groundY, camX, time, progress);
  drawGround(ctx, w, h, groundY, camX, progress);
  drawNearProps(ctx, w, groundY, camX, time, progress);

  // traveler stands a third into the screen
  const tx = Math.round(w * TRAVELER_SCREEN_X);
  const footY = Math.floor(groundY - groundHeight(camX + tx) + 1);
  drawTraveler(ctx, tx, footY, f.traveler);

  if (!f.reducedMotion) {
    if (f.traveler.speed > 0.5 && Math.random() < 0.3) {
      spawnDust(tx, footY, f.traveler.facing, f.traveler.speed);
    }
    drawDust(ctx, f.camDx);
  }

  // warm grade as dawn breaks
  const tint = dawnTint(progress);
  if (tint.alpha > 0.005) {
    ctx.globalAlpha = tint.alpha;
    ctx.fillStyle = tint.color;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }
}
