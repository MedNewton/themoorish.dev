import { MARKET_ROWS, type Trend } from '../data/content';
import { Reveal } from './Reveal';
import styles from './Markets.module.css';

const TREND_GLYPH: Record<Trend, string> = {
  up: '▲',
  hot: '▲▲',
  steady: '◆',
};

const TREND_WORD: Record<Trend, string> = {
  up: 'rising',
  hot: 'surging',
  steady: 'holding',
};

export function Markets() {
  return (
    <section id="markets" className={styles.markets}>
      <Reveal>
        <header className={styles.header}>
          <h2 className={styles.title}>The Daily Stack</h2>
          <p className={styles.standfirst}>
            Market Report — instruments held in the editor’s long-term
            portfolio. All positions actively traded in production.
          </p>
        </header>
      </Reveal>

      <Reveal delay={120}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Sym.</th>
                <th scope="col">Instrument</th>
                <th scope="col" className={styles.deskCol}>
                  Desk
                </th>
                <th scope="col" className={styles.noteCol}>
                  Broker’s Note
                </th>
                <th scope="col" className={styles.trendCol}>
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {MARKET_ROWS.map((row) => (
                <tr key={row.sym}>
                  <td className={styles.sym}>{row.sym}</td>
                  <td className={styles.name}>{row.name}</td>
                  <td className={styles.desk}>{row.desk}</td>
                  <td className={styles.note}>{row.note}</td>
                  <td
                    className={`${styles.trend} ${row.trend === 'hot' ? styles.hot : ''}`}
                  >
                    <span aria-hidden="true">{TREND_GLYPH[row.trend]}</span>
                    <span className={styles.srOnly}>
                      {TREND_WORD[row.trend]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
