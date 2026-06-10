import { profile } from '@/data/profile';
import Reveal from '@/components/Reveal';
import Typewriter from '@/components/Typewriter';
import styles from './sections.module.css';

const chips = [
  'TypeScript',
  'React / Next.js',
  'Web3 dApps',
  'Smart Contracts',
  'AI Agents',
  'MCP',
  'React Native',
  'Clean Architecture',
];

export default function About() {
  return (
    <section className={styles.section} data-chapter="1" id="about">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.kicker}>Chapter 02 — The Caravan Camp</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className={styles.title}>
            The traveler&rsquo;s <span className={styles.titleAccent}>story</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div className={styles.panel}>
            <div className={styles.body}>
              {profile.about.map((p) => (
                <p key={p.slice(0, 24)} style={{ marginBottom: '1em' }}>
                  {p}
                </p>
              ))}
            </div>
            <div className={`${styles.panel} ${styles.dialogue}`}>
              <span className={styles.dialogueTag}>THE TRAVELER</span>
              <p className={styles.dialogueText}>
                <Typewriter
                  text='"Fast, clear, no friction — that is the whole craft."'
                  speed={32}
                />
              </p>
            </div>
            <div className={styles.aboutChips}>
              {chips.map((c, i) => (
                <Reveal key={c} as="span" delay={i * 60}>
                  <span className={styles.chip}>{c}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
