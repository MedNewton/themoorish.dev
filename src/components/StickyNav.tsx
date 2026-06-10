import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './StickyNav.module.css';
import { navLinks } from './navLinks';

export default function StickyNav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setShown(window.scrollY > 480));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={clsx(styles.bar, shown && styles.shown)}
      aria-hidden={!shown}
    >
      <a href="#top" className={styles.monogram} tabIndex={shown ? 0 : -1}>
        T.M.T.
      </a>
      <nav className={styles.links} aria-label="Sections (compact)">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} tabIndex={shown ? 0 : -1}>
            {link.label}
          </a>
        ))}
      </nav>
      <a
        href="mailto:med.benmoussa.dev@gmail.com"
        className={styles.hire}
        tabIndex={shown ? 0 : -1}
      >
        Hire the Editor
      </a>
    </div>
  );
}
