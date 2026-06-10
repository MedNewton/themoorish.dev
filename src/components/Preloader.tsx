import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Preloader.module.css';

const WORDS = ['FULL—STACK', 'WEB3', 'A.I. AGENTS', 'MD®'];

interface PreloaderProps {
  onDone: () => void;
}

export default function Preloader({ onDone }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    document.body.dataset.press = 'on';

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const duration = reduced ? 200 : 2100;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setSplitting(true);
        doneRef.current();
        document.body.dataset.press = 'off';
        setTimeout(() => setGone(true), reduced ? 250 : 1200);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.dataset.press = 'off';
    };
  }, []);

  if (gone) return null;

  const word =
    WORDS[
      Math.min(WORDS.length - 1, Math.floor((progress / 100) * WORDS.length))
    ];

  return (
    <div
      className={clsx(styles.loader, splitting && styles.splitting)}
      aria-hidden="true"
    >
      <p className={styles.mark}>
        <span className={styles.m}>M</span>
        <span className={styles.d}>D</span>
      </p>
      <p className={styles.word}>{word}</p>
      <p className={styles.count}>{String(progress).padStart(3, '0')}</p>
    </div>
  );
}
