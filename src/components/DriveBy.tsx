import { useEffect, useRef } from 'react';
import styles from './DriveBy.module.css';

/** A gigantic MD® drives across the viewport, steered by the scrollbar. */
export default function DriveBy() {
  const trackRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const mark = markRef.current;
    if (!track || !mark) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      mark.style.transform = 'translateX(-25%)';
      return;
    }

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = track.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.min(
          1,
          Math.max(0, (vh - rect.top) / (vh + rect.height)),
        );
        const x = 25 - progress * 105;
        mark.style.transform = `translateX(${x}vw)`;
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={trackRef} className={styles.track} aria-hidden="true">
      <p ref={markRef} className={styles.mark}>
        MD<span className={styles.reg}>®</span>
      </p>
    </div>
  );
}
