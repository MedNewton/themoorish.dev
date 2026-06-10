import { BRIEFS, DISPATCHES } from '../data/content';
import { Reveal } from './Reveal';
import styles from './Dispatches.module.css';

export function Dispatches() {
  return (
    <section id="dispatches" className={styles.section}>
      <Reveal>
        <header className={styles.header}>
          <h2 className={styles.title}>Latest Dispatches</h2>
          <p className={styles.standfirst}>
            Selected works from the field. Several editions remain in private
            circulation, as is the custom with client commissions.
          </p>
        </header>
      </Reveal>

      <div className={styles.layout}>
        <div className={styles.grid}>
          {DISPATCHES.map((story, i) => {
            const card = (
              <article className={styles.story}>
                <p className={styles.kicker}>{story.kicker}</p>
                <h3 className={styles.headline}>{story.headline}</h3>
                <p className={styles.body}>
                  <span className={styles.dateline}>{story.dateline} — </span>
                  {story.body}
                </p>
                {story.href && (
                  <span className={styles.readMore}>Read the full story ☞</span>
                )}
              </article>
            );

            return (
              <Reveal
                key={story.headline}
                delay={(i % 3) * 110}
                className={styles.cell}
              >
                {story.href ? (
                  <a
                    className={styles.storyLink}
                    href={story.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200} className={styles.railReveal}>
          <aside className={styles.briefs}>
            <h3 className={styles.briefsTitle}>In Brief</h3>
            <ul className={styles.briefsList}>
              {BRIEFS.map((brief) => (
                <li key={brief.title} className={styles.brief}>
                  {brief.href ? (
                    <a href={brief.href} target="_blank" rel="noreferrer">
                      <strong className={styles.briefName}>
                        {brief.title}.
                      </strong>{' '}
                      {brief.text}
                    </a>
                  ) : (
                    <span>
                      <strong className={styles.briefName}>
                        {brief.title}.
                      </strong>{' '}
                      {brief.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
