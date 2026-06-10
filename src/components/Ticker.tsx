import { TICKER_ITEMS } from '../data/content';
import styles from './Ticker.module.css';

export function Ticker() {
  const reel = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className={styles.ticker} aria-label="News ticker">
      <span className={styles.label}>The Wire</span>
      <div className={styles.window}>
        <div className={styles.reel}>
          {reel.map((item, i) => (
            <span
              key={i}
              className={styles.item}
              aria-hidden={i >= TICKER_ITEMS.length || undefined}
            >
              {item}
              <span className={styles.separator}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
