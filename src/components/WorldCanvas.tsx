import { useEffect, useRef } from 'react';
import { renderWorld } from '@/world/render/world';
import type { TravelerState } from '@/world/render/character';
import {
  WORLD_LEN,
  ZONE_LEN,
  GATE_X,
  TRAVELER_SCREEN_X,
  chapters,
  zoneCenter,
} from '@/world/journey';
import { useJourneyStore, frameState } from '@/world/store';
import { clamp, clamp01 } from '@/world/render/math';
import styles from './WorldCanvas.module.css';

/** Target logical pixel height; actual scale snaps to integers for crispness. */
const BASE_H = 210;

interface Knot {
  scrollCenter: number;
  camX: number;
}

export default function WorldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const buffer = document.createElement('canvas');
    const bctx = buffer.getContext('2d');
    if (!bctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let running = true;
    let logicalW = 0;
    let logicalH = 0;
    let knots: Knot[] = [];
    let camX = 0;
    let lastT = performance.now();
    let camInitialized = false;

    const traveler: TravelerState = { stride: 0, speed: 0, facing: 1, time: 0 };

    function resize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // snap to integer scale; cap by width so phones see a wide enough slice
      const scale = Math.max(2, Math.min(Math.round(vh / BASE_H), Math.round(vw / 170)));
      logicalH = Math.ceil(vh / scale) + 1;
      logicalW = Math.ceil(vw / scale) + 1;
      buffer.width = logicalW;
      buffer.height = logicalH;
      canvas!.width = Math.round(vw * dpr);
      canvas!.height = Math.round(vh * dpr);
      canvas!.style.width = `${vw}px`;
      canvas!.style.height = `${vh}px`;
      measure();
    }

    /** Camera limit: the journey ends with the traveler inside the gate. */
    function maxCam(): number {
      return Math.max(
        1,
        Math.min(WORLD_LEN - logicalW, Math.round(GATE_X - logicalW * TRAVELER_SCREEN_X)),
      );
    }

    /** Piecewise-linear map: viewport-center scroll position -> camera x. */
    function measure() {
      const vh = window.innerHeight;
      const camEnd = maxCam();
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-chapter]'),
      ).sort((a, b) => a.offsetTop - b.offsetTop);
      const pts: Knot[] = [{ scrollCenter: vh * 0.5, camX: 0 }];
      sections.forEach((el) => {
        const idx = Number(el.dataset.chapter);
        const center = el.offsetTop + el.offsetHeight / 2;
        const target = clamp(zoneCenter(idx) - logicalW / 2, 0, camEnd);
        pts.push({ scrollCenter: center, camX: target });
      });
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - vh);
      pts.push({ scrollCenter: maxScroll + vh * 0.5, camX: camEnd });
      // enforce monotonic camera
      for (let i = 1; i < pts.length; i++) {
        if (pts[i].camX < pts[i - 1].camX) pts[i].camX = pts[i - 1].camX;
        if (pts[i].scrollCenter <= pts[i - 1].scrollCenter)
          pts[i].scrollCenter = pts[i - 1].scrollCenter + 1;
      }
      knots = pts;
    }

    function camTarget(scrollY: number): number {
      const c = scrollY + window.innerHeight * 0.5;
      if (knots.length === 0) return 0;
      if (c <= knots[0].scrollCenter) return knots[0].camX;
      for (let i = 0; i < knots.length - 1; i++) {
        const a = knots[i];
        const b = knots[i + 1];
        if (c <= b.scrollCenter) {
          const t = (c - a.scrollCenter) / (b.scrollCenter - a.scrollCenter);
          return a.camX + (b.camX - a.camX) * t;
        }
      }
      return knots[knots.length - 1].camX;
    }

    function frame(now: number) {
      if (!running) return;
      const dt = Math.min((now - lastT) / 1000, 0.1);
      lastT = now;

      const target = camTarget(window.scrollY);
      if (!camInitialized) {
        camX = target;
        camInitialized = true;
      }
      const ease = reducedMotion ? 1 : 1 - Math.pow(1 - 0.085, dt * 60);
      const dx = (target - camX) * ease;
      camX += dx;

      traveler.time += dt;
      const speed = Math.abs(dx);
      traveler.speed = traveler.speed * 0.85 + speed * 0.15;
      if (speed > 0.02) {
        traveler.stride += dx > 0 ? speed : -speed;
        traveler.facing = dx >= 0 ? 1 : -1;
      }

      const progress = clamp01(camX / maxCam());

      renderWorld(bctx!, {
        w: logicalW,
        h: logicalH,
        camX,
        camDx: dx,
        time: traveler.time,
        progress,
        traveler,
        reducedMotion,
      });

      ctx!.imageSmoothingEnabled = false;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.drawImage(buffer, 0, 0, logicalW, logicalH, 0, 0, canvas!.width, canvas!.height);

      // publish continuous values for the HUD (direct DOM, no re-render)
      frameState.progress = progress;
      frameState.camX = camX;
      frameState.speed = traveler.speed;
      document.documentElement.style.setProperty('--journey', progress.toFixed(4));

      const charWorldX = camX + logicalW * TRAVELER_SCREEN_X;
      const chapter = clamp(Math.floor(charWorldX / ZONE_LEN), 0, chapters.length - 1);
      const store = useJourneyStore.getState();
      if (store.chapter !== chapter) store.setChapter(chapter);
      if (!store.hasMoved && window.scrollY > 40) store.markMoved();

      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    // re-measure when content height settles (fonts/images)
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        lastT = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    raf = requestAnimationFrame(frame);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
