import styles from './Home.module.css';
import { useFitText } from './useFitText';

/*
 * Home
 * ────
 * Main landing page.
 *
 * Intro sequence:
 *   1. "THE MOORISH" wordmark reveals from below the baseline.
 *   2. Top-bar items (MD logo, MENU, CONTACT) follow with the
 *      same upward reveal, left-to-right, slightly staggered.
 *
 * The wordmark is sized via useFitText so its left/right edges line
 * up exactly with the MD logo and CONTACT label in the top bar, at
 * any viewport — without distorting the glyphs.
 */
export function Home() {
  const { containerRef, textRef, fontSize } = useFitText<
    HTMLDivElement,
    HTMLSpanElement
  >(1, 200);

  return (
    <div className={styles.root}>
      <span className={`${styles.frameLine} ${styles.frameTop}`} />
      <span className={`${styles.frameLine} ${styles.frameBottom}`} />
      <span className={`${styles.frameLine} ${styles.frameLeft}`} />
      <span className={`${styles.frameLine} ${styles.frameRight}`} />

      <header className={styles.topBar}>
        <span
          className={`${styles.topItem} ${styles.logo}`}
          style={{ ['--delay' as string]: '900ms' }}
        >
          <img src="/logoMD.png" alt="MD" />
        </span>

        <span
          className={`${styles.topItem} ${styles.center}`}
          style={{ ['--delay' as string]: '1000ms' }}
        >
          <button
            type="button"
            className={`${styles.topLabel} ${styles.navButton} ${styles.tapIn}`}
          >
            {Array.from('tap in').map((ch, i) => (
              <span
                key={i}
                className={styles.tapLetter}
                style={{ ['--i' as string]: i }}
                aria-hidden={ch === ' ' ? true : undefined}
              >
                <span className={styles.tapFace}>
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
                <span className={`${styles.tapFace} ${styles.tapFaceBack}`}>
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              </span>
            ))}
          </button>
        </span>

        <span
          className={`${styles.topItem} ${styles.end}`}
          style={{ ['--delay' as string]: '1100ms' }}
        >
          <button
            type="button"
            aria-label="Open menu"
            className={`${styles.navButton} ${styles.burger}`}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </span>

        <span className={`${styles.frameLine} ${styles.topBarDivider}`} />
      </header>

      <div className={styles.hero} ref={containerRef}>
        <span
          ref={textRef}
          className={styles.heroInner}
          style={{ fontSize: `${fontSize}px` }}
        >
          The Moorish
        </span>
      </div>

      <figure className={styles.media} data-cursor-hover>
        <img
          src="/med-img1.webp"
          alt="Mohamed Ben Moussa"
          className={styles.mediaImg}
        />
      </figure>
    </div>
  );
}
