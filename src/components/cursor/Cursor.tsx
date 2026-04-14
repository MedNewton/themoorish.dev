import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

/*
 * Cursor
 * ──────
 * A custom pointer that follows the mouse with smoothed easing. On
 * touch/coarse devices the component renders nothing and the native
 * cursor is used. On pointer-capable devices the native cursor is
 * hidden (see reset.css) and this olive circle takes its place.
 *
 * When the pointer is over an element marked `[data-cursor-hover]`,
 * `a`, `button`, or `input`, the cursor grows and shifts contrast so
 * interactive targets feel "catchy".
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFine) return;

    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target as HTMLElement | null;
      const interactive =
        !!target?.closest(
          'a, button, input, textarea, select, [data-cursor-hover]',
        );
      dot.dataset.hover = interactive ? 'true' : 'false';
    };

    const tick = () => {
      x += (mouseX - x) * 0.22;
      y += (mouseY - y) * 0.22;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => (dot.style.opacity = '1');
    const onLeave = () => (dot.style.opacity = '0');

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerenter', onEnter);
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerenter', onEnter);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={dotRef} className={styles.dot} aria-hidden="true" />;
}
