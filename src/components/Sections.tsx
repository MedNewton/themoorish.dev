import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { experience, identity } from '../data/profile';
import Signature from './Signature';
import { countIn, projects, toolkit, type ToolkitRow } from '../data/projects';
import { copyText, scrollToId, useReducedMotion, useReveal } from '../hooks';

const step = (i: number) => ({ '--i': i }) as CSSProperties;

export function Header() {
  const reduced = useReducedMotion();
  return (
    <header className="in" style={step(0)}>
      <a
        className="sig"
        href="#overview"
        aria-label="med, the moorish. Back to top"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('overview', reduced);
        }}
      >
        <Signature />
      </a>
      <a
        className="open"
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('contact', reduced);
        }}
      >
        <i />
        <span>Open to collaborations</span>
        <span aria-hidden="true">Let's talk</span>
      </a>
    </header>
  );
}

const WORDS = [
  'dApps',
  'AI agents',
  'DeFi tools',
  'mobile apps',
  'MCP servers',
];

export function Intro() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let swap: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      setLeaving(true);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setLeaving(false);
      }, 300);
    }, 2800);
    return () => {
      clearInterval(tick);
      clearTimeout(swap);
    };
  }, [reduced]);

  return (
    <div className="intro">
      <h1 className="in" style={step(1)}>
        Building{' '}
        <span key={index} className={leaving ? 'word out' : 'word inn'}>
          {WORDS[index]}
        </span>{' '}
        that feel effortless
      </h1>
      <p className="in" style={step(2)}>
        Hey! I'm {identity.name}, a full-stack and Web3 engineer in{' '}
        {identity.location}, turning DeFi, tokenization and AI agents into
        products people enjoy using.
      </p>
    </div>
  );
}

const ICONS: Record<ToolkitRow['icon'], ReactNode> = {
  gem: (
    <>
      <path d="M12 3l7 9-7 9-7-9z" />
      <path d="M5 12l7 3 7-3" />
    </>
  ),
  spark: (
    <path d="M12 3c.6 5 2 6.400 7 7-5 .6-6.400 2-7 7-.6-5-2-6.400-7-7 5-.6 6.400-2 7-7z" />
  ),
  code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.500 5l-3 14" />,
  phone: (
    <>
      <rect x="7" y="2.500" width="10" height="19" rx="2.500" />
      <path d="M11 18.500h2" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.700 3.100 3 7 3s7-1.300 7-3V6M5 12v6c0 1.700 3.100 3 7 3s7-1.300 7-3v-6" />
    </>
  ),
};

export function Experience() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="experience" className="rv" ref={ref}>
      <div className="shead">
        <h2>Experience</h2>
      </div>
      {experience.map((role) => (
        <div className="x" key={role.company}>
          <span className="mark" aria-hidden="true">
            {role.company[0]}
          </span>
          <div>
            <b>{role.company}</b>
            <span>{role.title}</span>
          </div>
          <em>{role.period}</em>
        </div>
      ))}
    </section>
  );
}

export function Toolkit() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="toolkit" className="rv" ref={ref}>
      <div className="shead">
        <h2>Toolkit</h2>
        <span className="note">{projects.length} projects shipped</span>
      </div>
      {toolkit.map((row) => {
        const count = row.category ? countIn(row.category) : 0;
        return (
          <div className="x" key={row.title}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {ICONS[row.icon]}
            </svg>
            <div>
              <b>{row.title}</b>
              <span>{row.tools}</span>
            </div>
            <em>
              {count ? `${count} ${count > 1 ? 'projects' : 'project'}` : ''}
            </em>
          </div>
        );
      })}
    </section>
  );
}

export function Contact() {
  const ref = useReveal<HTMLElement>();
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (await copyText(identity.email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  };

  return (
    <section id="contact" className="contact rv" ref={ref}>
      <h2>What shall we build next?</h2>
      <p>Have something in mind? Let's make it happen together.</p>
      <button
        type="button"
        className="hello"
        aria-expanded={shown}
        onClick={() => setShown(true)}
      >
        say hello!
      </button>
      {shown && (
        <div className="mail">
          <a href={`mailto:${identity.email}`}>{identity.email}</a>
          <button type="button" onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
    </section>
  );
}

/** A hand-drawn line of dev doodles on stems that draws itself in. */
export function Doodles() {
  const ref = useReveal<HTMLDivElement>();
  const d = (n: number) => ({ '--d': n }) as CSSProperties;
  return (
    <div className="doodles" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 900 120">
        <g style={d(0)}>
          <path
            pathLength={1}
            d="M52 30c-9 0-12 4-12 12v10c0 7-3 10-9 11 6 1 9 4 9 11v10c0 8 3 12 12 12"
          />
          <path
            pathLength={1}
            d="M78 30c9 0 12 4 12 12v10c0 7 3 10 9 11-6 1-9 4-9 11v10c0 8-3 12-12 12"
          />
          <path pathLength={1} d="M65 106v14" />
        </g>
        <g style={d(1)}>
          <circle pathLength={1} cx="160" cy="62" r="24" />
          <circle pathLength={1} cx="160" cy="62" r="16" />
          <path pathLength={1} d="M160 51l8 11-8 11-8-11z" />
          <path pathLength={1} d="M160 86v34" />
        </g>
        <g style={d(2)}>
          <path pathLength={1} d="M236 46l-18 17 18 17" />
          <path pathLength={1} d="M262 36l-12 54" />
          <path pathLength={1} d="M276 46l18 17-18 17" />
          <path pathLength={1} d="M256 96v24" />
        </g>
        <g style={d(3)}>
          <ellipse
            pathLength={1}
            cx="350"
            cy="52"
            rx="13"
            ry="20"
            transform="rotate(35 350 52)"
          />
          <ellipse
            pathLength={1}
            cx="368"
            cy="76"
            rx="13"
            ry="20"
            transform="rotate(35 368 76)"
          />
          <path pathLength={1} d="M360 98v22" />
        </g>
        <g style={d(4)}>
          <path
            pathLength={1}
            d="M450 26c2 22 6 30 26 34-20 4-24 12-26 34-2-22-6-30-26-34 20-4 24-12 26-34z"
          />
          <path
            pathLength={1}
            d="M478 28c1 7 2 9 8 10-6 1-7 3-8 10-1-7-2-9-8-10 6-1 7-3 8-10z"
          />
          <path pathLength={1} d="M450 96v24" />
        </g>
        <g style={d(5)}>
          <circle pathLength={1} cx="540" cy="76" r="9" />
          <circle pathLength={1} cx="582" cy="84" r="7" />
          <circle pathLength={1} cx="560" cy="42" r="11" />
          <path pathLength={1} d="M545 68l10-16M566 51l12 27M549 78l26 5" />
          <path pathLength={1} d="M560 94v26" />
        </g>
        <g style={d(6)}>
          <path
            pathLength={1}
            d="M640 40h56a6 6 0 0 1 6 6v36a6 6 0 0 1-6 6h-34l-14 12v-12h-8a6 6 0 0 1-6-6V46a6 6 0 0 1 6-6z"
          />
          <path pathLength={1} d="M654 64h.5M668 64h.5M682 64h.5" />
          <path pathLength={1} d="M668 102v18" />
        </g>
        <g style={d(7)}>
          <path pathLength={1} d="M752 34l34 26-15 3 9 18-8 4-9-18-11 10z" />
          <path pathLength={1} d="M766 92v28" />
        </g>
        <g style={d(8)}>
          <ellipse pathLength={1} cx="846" cy="42" rx="22" ry="8" />
          <path pathLength={1} d="M824 42v16c0 4 10 8 22 8s22-4 22-8V42" />
          <path pathLength={1} d="M824 58v16c0 4 10 8 22 8s22-4 22-8V58" />
          <path pathLength={1} d="M846 82v38" />
        </g>
      </svg>
      <p className="foot">
        © {new Date().getFullYear()} {identity.name} · {identity.site}
      </p>
    </div>
  );
}
