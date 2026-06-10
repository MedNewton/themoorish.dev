import styles from './Letters.module.css';
import Reveal from './Reveal';
import SectionBanner from './SectionBanner';
import { identity } from '../data/content';

/* 5×5 mini: REACT across, RWA and TS down. '' = blacked-out cell */
const puzzleRows = [
  ['', '', 'R', '', ''],
  ['', '', 'W', '', ''],
  ['R', 'E', 'A', 'C', 'T'],
  ['', '', '', '', 'S'],
  ['', '', '', '', ''],
];

const directory = [
  {
    label: 'Electronic Mail',
    value: identity.email,
    href: `mailto:${identity.email}`,
  },
  {
    label: 'LinkedIn Bureau',
    value: '/in/mohamed-ben-moussa',
    href: identity.linkedin,
  },
  { label: 'GitHub Press Room', value: '@MedNewton', href: identity.github },
];

export default function Letters() {
  return (
    <section id="letters" className={styles.letters}>
      <SectionBanner
        page="A5"
        section="Section Five · Correspondence"
        title="Letters to the Editor"
        note="The newsroom answers every wire"
      />

      <div className={styles.grid}>
        <Reveal className={styles.pitch}>
          <p className={styles.lede}>
            Open to collaborations on <strong>DeFi</strong>,{' '}
            <strong>RWAs</strong>, <strong>Web3 infrastructure</strong> and{' '}
            <strong>A.I.-agent products</strong>. Presses standing by; type
            already set.
          </p>
          <a className={styles.bigMail} href={`mailto:${identity.email}`}>
            <span className={styles.bigMailLabel}>Wire the Editor</span>
            <span className={styles.bigMailAddress}>{identity.email}</span>
          </a>
        </Reveal>

        <Reveal className={styles.directoryBox} delay={150}>
          <h3 className={styles.directoryTitle}>Newsroom Directory</h3>
          <ul className={styles.directory}>
            {directory.map((entry) => (
              <li key={entry.label}>
                <a href={entry.href} target="_blank" rel="noreferrer noopener">
                  <span className={styles.dirLabel}>{entry.label}</span>
                  <span className={styles.dirDots} />
                  <span className={styles.dirValue}>{entry.value}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.postage}>
            POSTAGE
            <br />
            PAID
          </p>
        </Reveal>

        <Reveal className={styles.puzzle} delay={100}>
          <h3 className={styles.puzzleTitle}>The Sunday Puzzle</h3>
          <div className={styles.puzzleInner}>
            <div className={styles.puzzleGrid} aria-hidden="true">
              {puzzleRows.flat().map((letter, i) => (
                <span
                  key={i}
                  className={letter ? styles.cellOpen : styles.cellBlack}
                  style={
                    letter
                      ? { transitionDelay: `${(i % 5) * 70 + 50}ms` }
                      : undefined
                  }
                >
                  {letter}
                </span>
              ))}
            </div>
            <div className={styles.clues}>
              <p>
                <strong>ACROSS</strong> — 3. UI library this very page is
                typeset with (5)
              </p>
              <p>
                <strong>DOWN</strong> — 1. Wall Street’s favourite three
                letters, now on-chain (3) · 2. A strongly typed companion, for
                short (2)
              </p>
              <p className={styles.puzzleHint}>
                Hover over the grid to peek at Sunday’s answers.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
