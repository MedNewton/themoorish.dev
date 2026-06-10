import { ADS } from '../data/content';
import { Reveal } from './Reveal';
import styles from './Classifieds.module.css';

export function Classifieds() {
  return (
    <section id="classifieds" className={styles.section}>
      <Reveal>
        <header className={styles.header}>
          <h2 className={styles.title}>Classifieds</h2>
          <p className={styles.standfirst}>
            Lines are open. Rates negotiable. Friction not accepted at this
            desk.
          </p>
        </header>
      </Reveal>

      <div className={styles.grid}>
        {ADS.map((ad, i) => (
          <Reveal key={ad.heading} delay={i * 110}>
            <a
              className={styles.ad}
              href={ad.href}
              target={ad.href?.startsWith('http') ? '_blank' : undefined}
              rel={ad.href?.startsWith('http') ? 'noreferrer' : undefined}
            >
              <h3 className={styles.adHeading}>{ad.heading}</h3>
              <p className={styles.adBody}>{ad.body}</p>
              {ad.cta && <span className={styles.adCta}>{ad.cta}</span>}
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
