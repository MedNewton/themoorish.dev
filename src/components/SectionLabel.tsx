import styles from './SectionLabel.module.css';
import Reveal from './Reveal';

interface SectionLabelProps {
  index: string;
  label: string;
}

export default function SectionLabel({ index, label }: SectionLabelProps) {
  return (
    <Reveal className={styles.row}>
      <span className={styles.pill}>({index})</span>
      <span className={styles.label}>{label}</span>
      <span className={styles.rule} aria-hidden="true" />
    </Reveal>
  );
}
