import styles from './SpecialReport.module.css';
import Reveal from './Reveal';
import { aiBullets } from '../data/content';

export default function SpecialReport() {
  return (
    <section id="special-report" className={styles.wrap}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <p className={styles.kicker}>Section Four · Special Report</p>
          <h2 className={styles.title}>
            The Machines Are Working <em>for</em> You Now
          </h2>
          <p className={styles.standfirst}>
            Our correspondent embeds with the agents, the protocols and the
            pipelines — and returns with notes from the frontier of agentic
            software.
          </p>
        </Reveal>

        <div className={styles.body}>
          <Reveal as="ul" className={styles.list} delay={120}>
            {aiBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </Reveal>

          <Reveal as="blockquote" className={styles.quote} delay={240}>
            <span className={styles.quoteMark} aria-hidden="true">
              “
            </span>
            <p>
              Agents, tools and models are only as good as the plumbing between
              them. I build the plumbing.
            </p>
            <cite>— The Editor, off the record</cite>
          </Reveal>
        </div>

        <Reveal as="span" className={`end-mark ${styles.endMark}`} delay={300}>
          — 30 —
        </Reveal>
      </div>
    </section>
  );
}
