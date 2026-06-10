import styles from './Dispatches.module.css';
import Reveal from './Reveal';
import SectionBanner from './SectionBanner';
import { dispatches, leadDispatch } from '../data/content';

export default function Dispatches() {
  return (
    <section id="dispatches" className={styles.dispatches}>
      <SectionBanner
        section="Section Three · The Work"
        title="Latest Dispatches"
        note="Client & team projects; some presses run behind closed doors"
      />

      <Reveal as="article" className={styles.leadStory}>
        <p className={styles.kicker}>{leadDispatch.kicker}</p>
        <h3 className={styles.leadHeadline}>{leadDispatch.headline}</h3>
        <p className={styles.leadDek}>{leadDispatch.dek}</p>
        <p className={styles.leadTag}>— Filed from the smart-contract desk</p>
      </Reveal>

      <div className={styles.grid}>
        {dispatches.map((story, i) => {
          const body = (
            <>
              <div className={styles.storyTop}>
                <span className={styles.no}>No. {story.no}</span>
                <span className={styles.kicker}>{story.kicker}</span>
              </div>
              <h3 className={styles.headline}>{story.headline}</h3>
              <p className={styles.dek}>{story.dek}</p>
              {story.link ? (
                <span className={styles.more}>
                  Read the full story <span aria-hidden="true">→</span>
                </span>
              ) : (
                <span className={styles.private}>
                  Printed in a private edition
                </span>
              )}
            </>
          );

          return (
            <Reveal
              as="div"
              key={story.no}
              className={styles.cell}
              delay={(i % 3) * 100}
            >
              {story.link ? (
                <a
                  className={styles.story}
                  href={story.link}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {body}
                </a>
              ) : (
                <article className={styles.story}>{body}</article>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
