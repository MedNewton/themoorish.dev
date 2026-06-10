import clsx from 'clsx';
import styles from './Hero.module.css';
import KineticLine from './KineticLine';
import { identity } from '../data/content';

interface HeroProps {
  ready: boolean;
}

export default function Hero({ ready }: HeroProps) {
  return (
    <section id="top" className={clsx(styles.hero, ready && styles.ready)}>
      <div className={styles.intro}>
        <p className={styles.meta}>
          {identity.name} — Portfolio, Edition №2
          <span className={styles.metaSep}>/</span>
          Based in {identity.location}
        </p>
        <p className={styles.meta}>©MMXXVI</p>
      </div>

      <h1 className={styles.title}>
        <span className={clsx(styles.lineClip, styles.l1)}>
          <span
            className={clsx(styles.line, styles.solid)}
            style={{ transitionDelay: '0.1s' }}
          >
            <KineticLine text="FULL—STACK" />
          </span>
        </span>
        <span className={clsx(styles.lineClip, styles.l2)}>
          <span
            className={clsx(styles.line, styles.outline)}
            style={{ transitionDelay: '0.22s' }}
          >
            <KineticLine text="WEB3 & A.I." />
          </span>
        </span>
        <span className={clsx(styles.lineClip, styles.l3)}>
          <span
            className={clsx(styles.line, styles.solid)}
            style={{ transitionDelay: '0.34s' }}
          >
            <KineticLine text="ENGINEER" />
            <span className={styles.tm} aria-hidden="true">
              ™
            </span>
          </span>
        </span>
      </h1>

      <div className={styles.foot}>
        <p className={styles.scrollHint} aria-hidden="true">
          Scroll
          <span className={styles.arrow}>↓</span>
        </p>
        <a href="#contact" className={styles.available}>
          <span className={styles.dot} aria-hidden="true" />
          Available for work
        </a>
      </div>
    </section>
  );
}
