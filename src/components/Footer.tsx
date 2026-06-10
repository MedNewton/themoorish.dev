import { CONTACT, PAPER } from '../data/content';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.name}>{PAPER.name}</p>
      <p className={styles.colophon}>
        Set in Playfair Display, Oswald &amp; Old Standard. Printed on recycled
        pixels. No bugs were knowingly shipped in the making of this edition.
      </p>
      <p className={styles.links}>
        <a href={`mailto:${CONTACT.email}`}>Email</a>
        <span aria-hidden="true">✦</span>
        <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <span aria-hidden="true">✦</span>
        <a href={CONTACT.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </p>
      <p className={styles.legal}>
        © {year} Mohamed Ben Moussa — themoorish.dev · All rights reserved, all
        builds passing.
      </p>
    </footer>
  );
}
