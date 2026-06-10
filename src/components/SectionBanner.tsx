import styles from './SectionBanner.module.css';
import Reveal from './Reveal';

interface SectionBannerProps {
  section: string;
  title: string;
  note?: string;
}

export default function SectionBanner({
  section,
  title,
  note,
}: SectionBannerProps) {
  return (
    <Reveal className={styles.banner}>
      <div className={styles.rules}>
        <span className={styles.section}>{section}</span>
        {note ? <span className={styles.note}>{note}</span> : null}
      </div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.bottomRule} />
    </Reveal>
  );
}
