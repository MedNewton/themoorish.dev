import styles from './Machines.module.css';
import Reveal from './Reveal';
import { machines } from '../data/content';

export default function Machines() {
  return (
    <section id="machines" className={styles.panel}>
      <div className={styles.inner}>
        <Reveal className={styles.labelRow}>
          <span className={styles.pill}>(03)</span>
          <span className={styles.label}>The Machines</span>
          <span className={styles.rule} aria-hidden="true" />
        </Reveal>

        <Reveal as="h2" className={styles.title} delay={80}>
          The machines
          <br />
          work <em>for</em> him.
        </Reveal>

        <ol className={styles.list}>
          {machines.map((item, i) => (
            <Reveal as="li" key={item} className={styles.item} delay={i * 90}>
              <span className={styles.num}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p>{item}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
