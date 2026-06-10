import { NAV, PAPER } from '../data/content';
import styles from './Masthead.module.css';

const today = new Date()
  .toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  .toUpperCase();

export function Masthead() {
  return (
    <header className={styles.masthead}>
      <div className={styles.dateRow}>
        <span>{PAPER.edition}</span>
        <span className={styles.date}>{today}</span>
        <span>{PAPER.price}</span>
      </div>

      <h1 className={styles.title}>
        <span className={styles.titleInner}>{PAPER.name}</span>
      </h1>

      <div className={styles.subRow}>
        <span className={styles.subItem}>{PAPER.origin}</span>
        <span className={styles.tagline}>“{PAPER.tagline}”</span>
        <span className={styles.subItem}>
          Editor-in-Chief: Mohamed Ben Moussa
        </span>
      </div>

      <nav className={styles.index} aria-label="Sections">
        <span className={styles.indexLabel}>Index:</span>
        {NAV.map((item) => (
          <a key={item.href} href={item.href} className={styles.indexLink}>
            {item.label}
            <sup className={styles.indexPage}>{item.page}</sup>
          </a>
        ))}
      </nav>
    </header>
  );
}
