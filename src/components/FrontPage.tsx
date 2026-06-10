import { LEAD } from '../data/content';
import { Reveal } from './Reveal';
import styles from './FrontPage.module.css';

export function FrontPage() {
  return (
    <section className={styles.front}>
      <Reveal>
        <p className={styles.kicker}>{LEAD.kicker}</p>
        <h2 className={styles.headline}>{LEAD.headline}</h2>
        <p className={styles.dek}>{LEAD.dek}</p>
      </Reveal>

      <div className={styles.spread}>
        <Reveal className={styles.storyReveal} delay={120}>
          <article className={styles.story}>
            <p className={styles.byline}>
              By{' '}
              <span className={styles.bylineName}>Our Staff Correspondent</span>{' '}
              · <span className={styles.dateline}>{LEAD.dateline} —</span>
            </p>
            {LEAD.paragraphs.map((paragraph, i) => (
              <p key={i} className={i === 0 ? styles.lede : styles.graf}>
                {paragraph}
              </p>
            ))}
            <p className={styles.continued}>{LEAD.continued}</p>
          </article>
        </Reveal>

        <Reveal className={styles.railReveal} delay={240}>
          <aside className={styles.rail}>
            <figure className={styles.photoBox}>
              <div className={styles.photo}>
                <img
                  src="/med-img1.webp"
                  alt="Mohamed Ben Moussa"
                  loading="eager"
                />
              </div>
              <figcaption className={styles.caption}>
                {LEAD.photoCaption}
              </figcaption>
            </figure>

            <blockquote className={styles.pullQuote}>
              <p>{LEAD.pullQuote}</p>
              <cite>{LEAD.pullQuoteAttribution}</cite>
            </blockquote>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
