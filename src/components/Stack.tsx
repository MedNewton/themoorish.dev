import styles from './Stack.module.css';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { stackRows } from '../data/content';

export default function Stack() {
  return (
    <section id="stack" className={styles.section}>
      <SectionLabel index="02" label="Stack — Type Specimen" />
      <div className={styles.layout}>
        <p className={styles.sticky}>
          Tools of
          <br />
          the trade
          <span className={styles.cursorBlock} aria-hidden="true" />
        </p>
        <div className={styles.rows}>
          {stackRows.map((row, i) => (
            <Reveal key={row.label} className={styles.row} delay={(i % 3) * 80}>
              <h3 className={styles.label}>{row.label}</h3>
              <p className={styles.items}>
                {row.items.map((item, j) => (
                  <span key={item}>
                    <span className={styles.item}>{item}</span>
                    {j < row.items.length - 1 && (
                      <span className={styles.sep} aria-hidden="true">
                        {' / '}
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
