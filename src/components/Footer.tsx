import styles from './Footer.module.css';
import { identity } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.colophon}>
          <p className={styles.brand}>The Moorish Times</p>
          <p className={styles.note}>
            Published whenever something ships · {identity.site} · Printed on
            100% recycled pixels
          </p>
        </div>
        <p className={styles.legal}>
          © {year} {identity.name}. Reproduction of this fine engineering
          without a friendly email is frowned upon.
        </p>
        <div className={styles.barcodeBox} aria-hidden="true">
          <span className={styles.barcode} />
          <span className={styles.barcodeText}>
            0 61965 00000 7 · 75¢ BEYOND THE FIREWALL
          </span>
        </div>
        <a href="#top" className={styles.top}>
          Return to the Front Page <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
