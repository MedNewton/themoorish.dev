import { profile } from '@/data/profile';
import PixelButton from '@/components/PixelButton';
import Reveal from '@/components/Reveal';
import styles from './sections.module.css';

export default function Contact() {
  return (
    <section className={`${styles.section} ${styles.contact}`} data-chapter="5" id="contact">
      <div className={`${styles.inner} ${styles.contactStage}`}>
        <Reveal>
          <p className={styles.kicker} style={{ justifyContent: 'center' }}>
            Chapter 06 — The Sunrise Gate
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className={styles.contactTitle}>
            NEW GAME<span style={{ color: 'var(--gold)' }}>+</span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className={styles.contactText}>
            The journey ends where the next one begins. Open to collaborations on{' '}
            <em>DeFi</em>, <em>RWAs</em>, <em>Web3 infra</em> and{' '}
            <em>AI-agent products</em> — let&rsquo;s build something worth shipping.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className={styles.contactCtas}>
            <PixelButton href={`mailto:${profile.email}`} size="lg">
              ✉ Send a raven
            </PixelButton>
            <PixelButton href={profile.linkedin} variant="ghost" size="lg" external>
              LinkedIn
            </PixelButton>
            <PixelButton href={profile.github} variant="ghost" size="lg" external>
              GitHub
            </PixelButton>
          </div>
        </Reveal>
        <Reveal delay={480}>
          <p className={styles.footer}>
            © {new Date().getFullYear()} {profile.name} — {profile.alias}
            <br />
            Hand-built pixel world. React + Canvas, no game engine, no asset packs.
            <br />
            <a href="#hero">↺ Restart journey</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
