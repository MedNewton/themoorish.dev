import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Nav.module.css';

const links = [
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#stack', label: 'Stack' },
  { href: '#work', label: 'Work' },
  { href: '#machines', label: 'Machines' },
  { href: '#contact', label: 'Contact' },
];

function moroccoTime() {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Africa/Casablanca',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

interface NavProps {
  ready: boolean;
}

export default function Nav({ ready }: NavProps) {
  const [time, setTime] = useState(moroccoTime);

  useEffect(() => {
    const id = setInterval(() => setTime(moroccoTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className={clsx(styles.nav, ready && styles.ready)}>
      <a href="#top" className={styles.mark}>
        MD<span className={styles.reg}>®</span>
      </a>
      <nav className={styles.links} aria-label="Sections">
        {links.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
      </nav>
      <p className={styles.clock}>
        <span className={styles.dot} aria-hidden="true" />
        Morocco&ensp;{time}
      </p>
    </header>
  );
}
