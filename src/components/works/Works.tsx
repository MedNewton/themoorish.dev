import { useEffect, useRef, useState } from 'react';
import styles from './Works.module.css';

type Project = {
  name: string;
  href?: string;
};

const PROJECTS: Project[] = [
  { name: 'NexLabs', href: 'https://www.nexlabs.io/' },
  { name: 'Urano Ecosystem', href: 'https://www.presale.uranoecosystem.com/' },
  { name: 'ctrl/shift 2026', href: 'https://www.ctrlshift.events/' },
  { name: 'NapulETH 2025', href: 'https://www.napuleth.org/archive/2025' },
  { name: 'Nifty Naples', href: 'https://www.niftynaples.it/' },
  { name: 'Mood Global Services', href: 'https://moodglobalservices.com/' },
  { name: 'Axiam Capital Group', href: 'https://axiamcapitalgroup.xyz/' },
  { name: 'Artrise Marketplace' },
  { name: 'Urano dApp' },
  { name: 'Connections-AI' },
  { name: 'SiteLab' },
  { name: 'Silicon Plan' },
];

export function Works() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="works"
      className={`${styles.root} ${revealed ? styles.revealed : ''}`}
    >
      <span className={`${styles.frameLine} ${styles.frameLeft}`} />
      <span className={`${styles.frameLine} ${styles.frameRight}`} />
      <span className={`${styles.frameLine} ${styles.frameBottom}`} />

      <header className={styles.header}>
        <h2 className={styles.heading}>
          <span className={styles.headingInner}>Works</span>
        </h2>
        <span className={`${styles.frameLine} ${styles.headerDivider}`} />
      </header>

      <ul className={styles.grid}>
        {PROJECTS.map((p, idx) => (
          <li
            key={idx}
            className={styles.item}
            style={{ ['--idx' as string]: idx }}
          >
            <a
              className={styles.itemLink}
              href={p.href ?? '#'}
              data-cursor-hover
            >
              <div className={styles.itemHead}>
                <span className={styles.itemNameClip}>
                  <span className={styles.itemName}>{p.name}</span>
                </span>
                <span className={styles.itemArrowClip} aria-hidden>
                  <span className={styles.itemArrow}>
                    <span className={styles.itemArrowHover}>
                      <svg
                        viewBox="0 0 24 24"
                        width="100%"
                        height="100%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                      >
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </span>
                  </span>
                </span>
              </div>
              <div className={styles.itemCard} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
