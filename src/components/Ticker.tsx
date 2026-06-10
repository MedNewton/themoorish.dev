import styles from './Ticker.module.css';
import { tickerItems } from '../data/content';

export default function Ticker() {
  const reel = [...tickerItems, ...tickerItems];
  return (
    <div className={styles.ticker} aria-hidden="true">
      <span className={styles.label}>The Wire</span>
      <div className={styles.window}>
        <div className={styles.reel}>
          {reel.map((item, i) => (
            <span key={i} className={styles.item}>
              {item}
              <span className={styles.star}>★</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
