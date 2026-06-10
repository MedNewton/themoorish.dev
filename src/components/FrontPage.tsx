import clsx from 'clsx';
import styles from './FrontPage.module.css';
import Reveal from './Reveal';
import { identity } from '../data/content';

const headlineLines = ['ENGINEER SHIPS', 'FULL-STACK, WEB3', '& A.I. PRODUCTS'];

function dateline() {
  return new Date()
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    .toUpperCase();
}

interface FrontPageProps {
  ready: boolean;
}

export default function FrontPage({ ready }: FrontPageProps) {
  return (
    <section
      id="front-page"
      className={clsx(styles.front, ready && styles.ready)}
    >
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
              <span className={styles.dropcap}>T</span>
              UNIS, {dateline()} — A full-stack developer has been observed
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
          <a className={styles.cta} href="#dispatches">
            Continued on the Dispatches page <span aria-hidden="true">→</span>
          </a>
        </article>

        {/* ── Portrait ──────────────────────────────────────── */}
        <Reveal as="figure" className={styles.figure} delay={150}>
          <div className={styles.halftone}>
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
              <li>
                <a href="#trade-pages">
                  <span>The Trade Pages</span>
                  <span className={styles.dots} />
                  <span>§2</span>
                </a>
              </li>
              <li>
                <a href="#dispatches">
                  <span>Latest Dispatches</span>
                  <span className={styles.dots} />
                  <span>§3</span>
                </a>
              </li>
              <li>
                <a href="#special-report">
                  <span>Special Report: A.I.</span>
                  <span className={styles.dots} />
                  <span>§4</span>
                </a>
              </li>
              <li>
                <a href="#letters">
                  <span>Letters to the Editor</span>
                  <span className={styles.dots} />
                  <span>§5</span>
                </a>
              </li>
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
    </section>
  );
}
