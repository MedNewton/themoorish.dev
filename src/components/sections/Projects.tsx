import { projects } from '@/data/profile';
import Reveal from '@/components/Reveal';
import { sfx } from '@/world/sound';
import styles from './sections.module.css';

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section className={styles.section} data-chapter="3" id="projects">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.kicker}>Chapter 04 — The City of Shipped Things</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className={styles.title}>
            Quest log — <span className={styles.titleAccent}>completed</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className={styles.body} style={{ marginBottom: 28 }}>
            Many of these are client or team quests — some code rests in private
            vaults. Each one shipped to real users.
          </p>
        </Reveal>

        <div className={styles.questGrid}>
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className={styles.quest} onMouseEnter={() => sfx.hover()}>
                <span className={styles.questStamp}>COMPLETED</span>
                <h3 className={styles.questTitle}>{p.title}</h3>
                <p className={styles.questKind}>{p.kind}</p>
                <p className={styles.questDesc}>{p.description}</p>
                <div className={styles.questStack}>
                  {p.stack.map((s) => (
                    <span key={s} className={styles.stackTag}>
                      {s}
                    </span>
                  ))}
                </div>
                {p.url && (
                  <a
                    className={styles.questLink}
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => sfx.click()}
                  >
                    Visit <span aria-hidden="true">▸</span>
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <details className={styles.moreQuests}>
            <summary className={styles.moreSummary} onClick={() => sfx.click()}>
              {more.length} more side quests
            </summary>
            <div className={styles.moreList}>
              {more.map((p) => {
                const inner = (
                  <>
                    <span className={styles.miniTitle}>
                      {p.title}
                      {p.url && (
                        <span className={styles.miniArrow} aria-hidden="true">
                          ↗
                        </span>
                      )}
                    </span>
                    <span className={styles.miniKind}>{p.kind}</span>
                  </>
                );
                return p.url ? (
                  <a
                    key={p.title}
                    className={styles.miniQuest}
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    onMouseEnter={() => sfx.hover()}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={p.title} className={styles.miniQuest}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
