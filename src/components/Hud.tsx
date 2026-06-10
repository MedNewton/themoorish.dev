import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { chapters } from '@/world/journey';
import { useJourneyStore } from '@/world/store';
import { sfx, setSoundEnabled } from '@/world/sound';
import styles from './Hud.module.css';

function scrollToChapter(index: number) {
  const el = document.querySelector<HTMLElement>(`[data-chapter="${index}"]`);
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export default function Hud() {
  const chapter = useJourneyStore((s) => s.chapter);
  const hasMoved = useJourneyStore((s) => s.hasMoved);
  const soundOn = useJourneyStore((s) => s.soundOn);
  const toggleSound = useJourneyStore((s) => s.toggleSound);

  const [toastKey, setToastKey] = useState(0);
  const prevChapter = useRef(0);
  const ch = chapters[chapter];

  useEffect(() => {
    if (prevChapter.current !== chapter) {
      prevChapter.current = chapter;
      setToastKey((k) => k + 1);
      sfx.chapter();
    }
  }, [chapter]);

  useEffect(() => {
    setSoundEnabled(soundOn);
  }, [soundOn]);

  // arrow keys jump between chapters, like level select
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const current = useJourneyStore.getState().chapter;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToChapter(Math.min(current + 1, chapters.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToChapter(Math.max(current - 1, 0));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* quest log — top left */}
      <div className={styles.questLog} role="status" aria-live="polite">
        <div key={toastKey} className={styles.questInner}>
          <span className={styles.questUpdated}>
            {chapter === 0 ? '◆ NEW JOURNEY' : '◆ QUEST UPDATED'}
          </span>
          <span className={styles.chapterLabel}>
            {ch.label} — {ch.place}
          </span>
          <span className={styles.questText}>▸ {ch.quest}</span>
        </div>
      </div>

      {/* sound toggle — top right */}
      <button
        type="button"
        className={styles.soundBtn}
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
      >
        {soundOn ? 'SND ON' : 'SND OFF'}
      </button>

      {/* journey bar — bottom */}
      <nav className={styles.journeyBar} aria-label="Journey chapters">
        <div className={styles.barTrack}>
          <div className={styles.barFill} />
          {chapters.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={clsx(styles.waypoint, i <= chapter && styles.reached)}
              style={{ left: `${(i / (chapters.length - 1)) * 100}%` }}
              onClick={() => scrollToChapter(i)}
              onMouseEnter={() => sfx.hover()}
              aria-label={`${c.label} ${c.place}`}
              aria-current={i === chapter ? 'step' : undefined}
            >
              <span className={styles.waypointTip}>
                {c.label} {c.place}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* scroll hint */}
      <div className={clsx(styles.hint, hasMoved && styles.hintHidden)} aria-hidden="true">
        <span className={styles.hintArrow}>▼</span> SCROLL TO WALK
      </div>
    </>
  );
}
