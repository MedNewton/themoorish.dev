import { useEffect, useRef } from 'react';

interface KineticLineProps {
  text: string;
  className?: string;
}

/**
 * Splits a line into letters whose variable-font width axis is pinched
 * by the cursor — the wider-than-life logo letterforms squeeze aside
 * as the reader's hand passes through them.
 */
export default function KineticLine({ text, className }: KineticLineProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const letters = Array.from(
      root.querySelectorAll<HTMLSpanElement>('[data-letter]'),
    );
    const widths = letters.map(() => 125);
    let mouseX = -1e4;
    let mouseY = -1e4;
    let raf = 0;
    let running = false;

    const REST = 125;
    const PINCH = 68;
    const RADIUS = 170;

    const frame = () => {
      const rects = letters.map((el) => el.getBoundingClientRect());
      let settled = true;
      for (let i = 0; i < letters.length; i++) {
        const rect = rects[i];
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(mouseX - cx, mouseY - cy);
        const falloff = Math.max(0, 1 - dist / RADIUS);
        const target = REST - (REST - PINCH) * falloff;
        widths[i] += (target - widths[i]) * 0.16;
        if (Math.abs(target - widths[i]) > 0.2) settled = false;
        letters[i].style.fontStretch = `${widths[i]}%`;
      }
      if (settled && mouseX === -1e4) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      wake();
    };

    const onLeave = () => {
      mouseX = -1e4;
      mouseY = -1e4;
      wake();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span ref={rootRef} className={className} aria-label={text} role="text">
      {Array.from(text).map((char, i) =>
        char === ' ' ? (
          <span key={i} aria-hidden="true">
            {' '}
          </span>
        ) : (
          <span
            key={i}
            data-letter
            aria-hidden="true"
            style={{ display: 'inline-block' }}
          >
            {char}
          </span>
        ),
      )}
    </span>
  );
}
