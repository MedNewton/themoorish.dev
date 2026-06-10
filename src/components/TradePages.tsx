import styles from './TradePages.module.css';
import Reveal from './Reveal';
import SectionBanner from './SectionBanner';
import { identity, stackAds } from '../data/content';

export default function TradePages() {
  return (
    <section id="trade-pages" className={styles.trade}>
      <SectionBanner
        page="A2"
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

        <Reveal as="aside" className={styles.hireAd} delay={300}>
          <span className={styles.starburst} aria-hidden="true">
            <span>
              ACT
              <br />
              NOW!
            </span>
          </span>
          <p className={styles.hireKicker}>— Advertisement —</p>
          <h3 className={styles.hireTitle}>
            Hire
            <br />
            This Man!
          </h3>
          <p className={styles.hireBody}>
            Ships full-stack. Speaks Solidity. House-trained on monorepos.
            Satisfaction <em>guaranteed</em> or your money back<sup>*</sup>
          </p>
          <a className={styles.hireCta} href={`mailto:${identity.email}`}>
            <span aria-hidden="true">☞</span> Enquire Within
          </a>
          <p className={styles.hireFine}>
            *No money shall change hands at any point.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
