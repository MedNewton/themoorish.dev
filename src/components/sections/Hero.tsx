import { profile } from '@/data/profile';
import PixelButton from '@/components/PixelButton';
import Typewriter from '@/components/Typewriter';
import Reveal from '@/components/Reveal';
import styles from './sections.module.css';

export default function Hero() {
  const [first, ...rest] = profile.name.split(' ');
  return (
    <section className={`${styles.section} ${styles.hero}`} data-chapter="0" id="hero">
      <div className={styles.heroStage}>
        <Reveal>
          <span className={styles.heroAlias}>{profile.alias}</span>
        </Reveal>
        <Reveal delay={120}>
          <h1 className={styles.heroName}>
            <span>{first}</span>
            <span className={styles.heroNameLast}>{rest.join(' ')}</span>
          </h1>
        </Reveal>
        <p className={styles.heroRole}>
          <Typewriter text={profile.role} speed={45} startDelay={700} />
        </p>
        <Reveal delay={400}>
          <p className={styles.heroTagline}>{profile.tagline}</p>
        </Reveal>
        <Reveal delay={550}>
          <div className={styles.heroCtas}>
            <PixelButton
              onClick={() =>
                document
                  .querySelector('[data-chapter="1"]')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }
            >
              Begin the journey ▼
            </PixelButton>
            <PixelButton
              variant="ghost"
              onClick={() =>
                document
                  .querySelector('[data-chapter="3"]')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }
            >
              Skip to quests
            </PixelButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
