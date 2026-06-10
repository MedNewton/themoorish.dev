import { aiCapabilities } from '@/data/profile';
import Reveal from '@/components/Reveal';
import styles from './sections.module.css';

export default function AiAgents() {
  return (
    <section className={styles.section} data-chapter="4" id="ai">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.kicker}>Chapter 05 — The Agent District</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className={styles.title}>
            Machine <span className={styles.titleAccent}>companions</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div className={styles.terminal}>
            <div className={styles.termBar}>
              <span className={styles.termDot} style={{ background: 'var(--terracotta)' }} />
              <span className={styles.termDot} style={{ background: 'var(--gold)' }} />
              <span className={styles.termDot} style={{ background: 'var(--teal)' }} />
              <span className={styles.termTitle}>agent@themoorish:~</span>
            </div>
            <div className={styles.termBody}>
              {aiCapabilities.map((cap, i) => (
                <Reveal key={cap.cmd} delay={200 + i * 160}>
                  <div className={styles.termLine}>
                    <span className={styles.termCmd}>{cap.cmd}</span>
                    <span className={styles.termOut}>{cap.text}</span>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={200 + aiCapabilities.length * 160}>
                <span className={styles.termCursor}>▌</span>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
