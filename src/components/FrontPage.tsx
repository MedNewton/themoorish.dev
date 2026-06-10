import { useRef, type MouseEvent } from 'react';
import clsx from 'clsx';
import styles from './FrontPage.module.css';
import Reveal from './Reveal';
import { identity, marketRows } from '../data/content';

const headlineLines = ['ENGINEER SHIPS', 'FULL-STACK, WEB3', '& A.I. PRODUCTS'];

const indexEntries = [
  { href: '#trade-pages', label: 'The Trade Pages', page: 'A2' },
  { href: '#dispatches', label: 'Latest Dispatches', page: 'A3' },
  { href: '#special-report', label: 'Special Report: A.I.', page: 'A4' },
  { href: '#letters', label: 'Letters to the Editor', page: 'A5' },
];

function dateline() {
  return new Date()
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    .toUpperCase();
}

interface FrontPageProps {
  ready: boolean;
}

export default function FrontPage({ ready }: FrontPageProps) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const handleTilt = (event: MouseEvent<HTMLDivElement>) => {
    const node = tiltRef.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg)`;
  };

  const resetTilt = () => {
    if (tiltRef.current) tiltRef.current.style.transform = '';
  };

  return (
    <section
      id="front-page"
      className={clsx(styles.front, ready && styles.ready)}
    >
      <div className={styles.coffeeStain} aria-hidden="true" />
      <div className={styles.grid}>
        {/* ── Lead story ────────────────────────────────────── */}
        <article className={styles.lead}>
          <h2 className={styles.headline}>
            {headlineLines.map((line, i) => (
              <span key={line} className={styles.lineClip}>
                <span
                  className={styles.line}
                  style={{ transitionDelay: `${0.45 + i * 0.12}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className={styles.subhead}>
            Clients Rejoice as Clean Architecture, Good DX and Smooth UX Are
            Declared Non-Negotiable; “Fast, Clear, No Friction,” Says Source
          </p>
          <p className={styles.byline}>
            By <strong>{identity.name.toUpperCase()}</strong> — Special
            Correspondent
          </p>
          <div className={styles.columns}>
            <p>
              <span className={styles.dropcap}>M</span>
              OROCCO, {dateline()} — A full-stack developer has been observed
              building modern TypeScript and React applications, Web3 dApps and
              agentic A.I. systems at a pace described by witnesses as
              “relentless.” The engineer, who answers to{' '}
              <strong>Mohamed Ben Moussa</strong>, ships products around DeFi,
              tokenization, real-world assets, marketplaces and CRMs.
            </p>
            <p>
              Investigators confirm experience designing A.I. agents,
              multi-agent systems, and MCP servers and clients — the plumbing
              that lets large language models reach tools, APIs and external
              systems. He is reportedly comfortable across the entire
              broadsheet: frontend, backend, smart contracts and integrations.
            </p>
            <p>
              Sources close to the matter say he is obsessed with clean
              architecture, good developer experience and smooth user
              experience. When reached for comment, he simply shipped another
              feature. The story develops below.
            </p>
          </div>
          <span className={clsx('end-mark', styles.endMark)}>— 30 —</span>
          <a className={styles.cta} href="#dispatches">
            <span className={styles.manicule} aria-hidden="true">
              ☞
            </span>{' '}
            Continued on the Dispatches page
          </a>
        </article>

        {/* ── Portrait ──────────────────────────────────────── */}
        <Reveal as="figure" className={styles.figure} delay={150}>
          <div
            ref={tiltRef}
            className={styles.halftone}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
          >
            <img
              src="/med-img1.webp"
              alt={`Portrait of ${identity.name}`}
              width={520}
              height={650}
              loading="eager"
            />
            <span className={styles.stamp}>
              THE
              <br />
              MOORISH
            </span>
          </div>
          <figcaption className={styles.caption}>
            The engineer, photographed moments before deploying to production. —
            Staff Photo
          </figcaption>
        </Reveal>

        {/* ── Index column ──────────────────────────────────── */}
        <aside className={styles.aside}>
          <Reveal delay={250}>
            <h3 className={styles.asideTitle}>Inside This Issue</h3>
            <ul className={styles.index}>
              {indexEntries.map((entry) => (
                <li key={entry.href}>
                  <a href={entry.href}>
                    <span>{entry.label}</span>
                    <span className={styles.dots} />
                    <span>{entry.page}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={350}>
            <div className={styles.brief}>
              <h3 className={styles.briefTitle}>Who Is This Man?</h3>
              <p>
                Full-stack & Web3 engineer. Builds with TypeScript, React,
                Next.js, smart contracts and A.I. agents. Open to collaborations
                on DeFi, RWAs, Web3 infrastructure and A.I.-agent products.
              </p>
              <a href={`mailto:${identity.email}`} className={styles.briefLink}>
                Wire the newsroom <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </aside>
      </div>

      {/* ── Below the fold ──────────────────────────────────── */}
      <div className={styles.fold} aria-hidden="true">
        <span className={styles.foldLabel}>· the fold ·</span>
      </div>
      <div className={styles.belowFold}>
        <Reveal as="article" className={styles.foldBox}>
          <h3 className={styles.foldTitle}>The Weather Bureau</h3>
          <p className={styles.weatherGlyph} aria-hidden="true">
            ☀
          </p>
          <p className={styles.foldBody}>
            <strong>TODAY:</strong> Heavy shipping with scattered deploys.
            Visibility: type-safe. Winds of change at 100 WPM.{' '}
            <strong>TONIGHT:</strong> Clear skies, dark mode.
          </p>
        </Reveal>

        <Reveal as="article" className={styles.foldBox} delay={120}>
          <h3 className={styles.foldTitle}>The Markets · Skills Exchange</h3>
          <table className={styles.markets}>
            <tbody>
              {marketRows.map((row) => (
                <tr
                  key={row.symbol}
                  className={row.move === 'down' ? styles.down : undefined}
                >
                  <td>{row.symbol}</td>
                  <td aria-hidden="true">{row.move === 'up' ? '▲' : '▼'}</td>
                  <td>{row.quote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal as="article" className={styles.foldBox} delay={240}>
          <h3 className={styles.foldTitle}>Obituaries</h3>
          <p className={styles.foldBody}>
            <strong>BUG, Production</strong> — aged 3 minutes, passed away
            suddenly following a hotfix on {dateline().toLowerCase()}. Survived
            by its regression test. In lieu of flowers, the family requests code
            reviews.
          </p>
          <span className={clsx('end-mark', styles.obitMark)}>✝</span>
        </Reveal>
      </div>
    </section>
  );
}
