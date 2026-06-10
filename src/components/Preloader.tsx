import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Preloader.module.css';

const STAGES = [
  'SETTING TYPE…',
  'INKING THE PLATES…',
  'ROLLING THE PRESSES…',
  'HOT OFF THE PRESS!',
];

interface PreloaderProps {
  onDone: () => void;
}

export default function Preloader({ onDone }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [stamped, setStamped] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    document.body.dataset.press = 'on';

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const duration = reduced ? 250 : 2300;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setStamped(true);
        setTimeout(
          () => {
            setExiting(true);
            doneRef.current();
            document.body.dataset.press = 'off';
            setTimeout(() => setGone(true), 1000);
          },
          reduced ? 200 : 950,
        );
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.dataset.press = 'off';
    };
  }, []);

  if (gone) return null;

  const stage =
    STAGES[
      Math.min(STAGES.length - 1, Math.floor((progress / 100) * STAGES.length))
    ];

  return (
    <div
      className={clsx(styles.press, exiting && styles.exiting)}
      aria-hidden="true"
    >
      <div className={clsx(styles.inner, stamped && styles.shake)}>
        {stamped ? (
          <span className={styles.seal}>
            PASSED
            <br />
            FOR PRESS
          </span>
        ) : null}
        <p className={styles.extra}>
          <span>★</span> EXTRA! EXTRA! <span>★</span>
        </p>
        <p className={styles.masthead}>The Moorish Times</p>
        <p className={styles.stage}>{stage}</p>
        <div className={styles.barTrack}>
          <div className={styles.barInk} style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.count}>
          {String(progress).padStart(3, '0')}
          <span> / 100</span>
        </p>
      </div>
      <div className={styles.curtainTop} />
      <div className={styles.curtainBottom} />
    </div>
  );
}
