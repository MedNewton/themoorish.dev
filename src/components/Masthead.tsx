import clsx from 'clsx';
import styles from './Masthead.module.css';
import { navLinks } from './navLinks';

function editionDate() {
  return new Date()
    .toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toUpperCase();
}

function editionName() {
  const hour = new Date().getHours();
  if (hour < 6) return 'NIGHT OWL EDITION';
  if (hour < 12) return 'MORNING EDITION';
  if (hour < 18) return 'AFTERNOON EDITION';
  return 'LATE CITY EDITION';
}

interface MastheadProps {
  ready: boolean;
}

export default function Masthead({ ready }: MastheadProps) {
  return (
    <header id="top" className={clsx(styles.masthead, ready && styles.ready)}>
      <div className={styles.inner}>
        <div className={styles.earsRow}>
          <p className={styles.ear}>
            “All the Code
            <br />
            That’s Fit to Ship”
          </p>
          <h1 className={styles.title}>The Moorish Times</h1>
          <p className={clsx(styles.ear, styles.earRight)}>
            Weather: 100%
            <br />
            chance of shipping
          </p>
        </div>

        <div className={styles.dateline}>
          <span className={styles.vol}>VOL. XXIX … No. 1965</span>
          <span className={styles.date}>{editionDate()}</span>
          <span className={styles.price}>
            <em className={styles.edition}>{editionName()}</em> · PRICE: FREE
          </span>
        </div>

        <nav className={styles.nav} aria-label="Sections">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
