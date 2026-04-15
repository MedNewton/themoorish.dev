import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import styles from './About.module.css';

const SKILL_SLOTS: string[][] = [
  ['Web3', 'DeFi', 'dApps', 'RWAs'],
  ['AI Agents', 'Multi-Agent', 'MCP', 'RAG'],
  ['Front-End', 'Next.js', 'React', 'Vite'],
  ['SaaS MVP', 'Monorepos', 'Supabase', 'Stripe'],
  ['UI Design', 'Motion', 'UX', 'Craft'],
];

const longest = (words: string[]) =>
  words.reduce((a, b) => (a.length >= b.length ? a : b));

function RollingWord({ words, delay }: { words: string[]; delay: number }) {
  const [i, setI] = useState(0);
  const next = (i + 1) % words.length;
  return (
    <span
      className={styles.roll}
      style={{ animationDelay: `${delay}ms` }}
      onAnimationIteration={() => {
        flushSync(() => setI((x) => (x + 1) % words.length));
      }}
    >
      <span className={`${styles.rollFace} ${styles.rollSizer}`} aria-hidden>
        {longest(words)}
      </span>
      <span className={styles.rollFace}>{words[i]}</span>
      <span className={`${styles.rollFace} ${styles.rollFaceBack}`}>
        {words[next]}
      </span>
    </span>
  );
}

export function About() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className={`${styles.root} ${revealed ? styles.revealed : ''}`}
    >
      <span className={`${styles.frameLine} ${styles.frameLeft}`} />
      <span className={`${styles.frameLine} ${styles.frameRight}`} />
      <span className={`${styles.frameLine} ${styles.frameBottom}`} />

      <header className={styles.header}>
        <h2 className={styles.heading}>
          <span className={styles.headingInner}>About</span>
        </h2>
        <span className={`${styles.frameLine} ${styles.headerDivider}`} />
      </header>

      <div className={styles.body}>
        <span className={`${styles.frameLine} ${styles.columnDivider}`} />
        <div className={styles.copy}>
          <p>
            A full-stack &amp; Web3 engineer shipping production systems
            end to end — contracts, backend, and interface shaped as a
            single surface. Fluent in TypeScript, Next.js, React, and Node,
            with deep on-chain work in Solidity, Thirdweb, and Viem across
            DeFi indices, tokenized RWAs, and NFT marketplaces.
          </p>
          <p>
            Specialized in agentic AI: architecting multi-agent systems,
            building MCP servers, and orchestrating multi-provider pipelines
            with RAG and real-time monitoring to power AI-driven SaaS — from
            business-plan platforms to full website generation engines.
            Clean architecture under the hood, smooth UX on top, crafted to
            ship and built to scale.
          </p>
          <p>
            Equally at home on mobile — React Native and Expo apps wired to
            Stripe, Firebase, LiveKit, and Better Auth — and on infra:
            multi-tenant monorepos, serverless backends, Supabase with
            pgvector, and CI/CD that holds up under real traffic. Every
            choice serves the same goal: products with a point of view,
            delivered as one coherent piece from contract to pixel.
          </p>
        </div>

        <ul className={styles.skills}>
          {SKILL_SLOTS.map((words, idx) => (
            <li key={idx} className={styles.skill}>
              <RollingWord words={words} delay={3000 + idx * 220} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
