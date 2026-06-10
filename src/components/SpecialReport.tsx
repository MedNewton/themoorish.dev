import { SPECIAL_REPORT } from '../data/content';
import { Reveal } from './Reveal';
import styles from './SpecialReport.module.css';

export function SpecialReport() {
  return (
    <section id="report" className={styles.section}>
      <Reveal>
        <div className={styles.band}>
          <header className={styles.header}>
            <p className={styles.kicker}>Special Report</p>
            <h2 className={styles.title}>THE AGENTS ARE HERE</h2>
            <p className={styles.standfirst}>
              An investigation into the artificial-intelligence operation
              running out of the back office — and the protocols keeping it
              honest.
            </p>
          </header>

          <div className={styles.items}>
            {SPECIAL_REPORT.map((item, i) => (
              <Reveal key={item.slug} delay={i * 110}>
                <article className={styles.item}>
                  <h3 className={styles.slug}>{item.slug}</h3>
                  <p className={styles.text}>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
