import styles from './Marquee.module.css';
import { marqueeItems } from '../data/content';

export default function Marquee() {
  const reel = [...marqueeItems, ...marqueeItems];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.reel}>
        {reel.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.spark}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
