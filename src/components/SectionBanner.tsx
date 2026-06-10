import styles from './SectionBanner.module.css';
import Reveal from './Reveal';

interface SectionBannerProps {
  page: string;
  section: string;
  title: string;
  note?: string;
}

export default function SectionBanner({
  page,
  section,
  title,
  note,
}: SectionBannerProps) {
  return (
    <Reveal className={styles.banner}>
      <div className={styles.rules}>
        <span className={styles.section}>{section}</span>
        <span className={styles.page}>Page {page}</span>
        {note ? <span className={styles.note}>{note}</span> : null}
      </div>
      <h2 className={styles.title}>
        <span className={styles.ornament} aria-hidden="true">
          ◆ ◆ ◆
        </span>
        <span className={styles.titleText}>{title}</span>
        <span className={styles.ornament} aria-hidden="true">
          ◆ ◆ ◆
        </span>
      </h2>
      <div className={styles.bottomRule} />
    </Reveal>
  );
}
