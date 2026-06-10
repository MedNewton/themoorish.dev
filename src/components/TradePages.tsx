import styles from './TradePages.module.css';
import Reveal from './Reveal';
import SectionBanner from './SectionBanner';
import { stackAds } from '../data/content';

export default function TradePages() {
  return (
    <section id="trade-pages" className={styles.trade}>
      <SectionBanner
        section="Section Two · Classifieds"
        title="The Trade Pages"
        note="Tools & situations, hand-set in lead type"
      />
      <div className={styles.grid}>
        {stackAds.map((ad, i) => (
          <Reveal
            as="article"
            key={ad.title}
            className={styles.ad}
            delay={(i % 4) * 90}
          >
            {ad.flair ? <span className={styles.flair}>{ad.flair}</span> : null}
            <h3 className={styles.adTitle}>{ad.title}</h3>
            <p className={styles.adNote}>{ad.note}</p>
            <ul className={styles.items}>
              {ad.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
