import styles from './Footer.module.css';
import KineticLine from './KineticLine';
import { identity } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.meta}>
        <p>
          © {year} {identity.name}
        </p>
        <p className={styles.colophon}>
          Set in Archivo & Azeret Mono — {identity.site}
        </p>
        <a href="#top" className={styles.top}>
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
      <p className={styles.mark}>
        <KineticLine text="MD" />
      </p>
    </footer>
  );
}
