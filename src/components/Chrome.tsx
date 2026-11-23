import { useState } from 'react';
import { identity } from '../data/profile';
import {
  copyText,
  scrollToId,
  useActiveSection,
  useReducedMotion,
  useTheme,
} from '../hooks';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'work', label: 'Things I build' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
];
const IDS = SECTIONS.map((s) => s.id);

export function SideNav() {
  const active = useActiveSection(IDS);
  const reduced = useReducedMotion();
  return (
    <nav className="side" aria-label="Sections">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={active === s.id ? 'on' : undefined}
          aria-current={active === s.id ? 'true' : undefined}
          onClick={(e) => {
            e.preventDefault();
            scrollToId(s.id, reduced);
          }}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}

export function Dock() {
  const reduced = useReducedMotion();
  const toggleTheme = useTheme();
  const [tip, setTip] = useState('Copy email');

  const copy = async () => {
    if (await copyText(identity.email)) {
      setTip('Copied');
      setTimeout(() => setTip('Copy email'), 1400);
    } else {
      window.location.href = `mailto:${identity.email}`;
    }
  };

  return (
    <nav className="dock" aria-label="Quick links">
      <a
        className="pill"
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('work', reduced);
        }}
      >
        Work
      </a>
      <button
        type="button"
        data-tip={tip}
        aria-label="Copy email address"
        onClick={copy}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2.500" />
          <path d="M3.500 7.500l8.500 6 8.500-6" />
        </svg>
      </button>
      <a
        href={identity.github}
        target="_blank"
        rel="noopener noreferrer"
        data-tip="GitHub"
        aria-label="GitHub"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 19c-4.300 1.400-4.300-2.500-6-3m12 5v-3.500c0-1 .1-1.400-.5-2 2.800-.3 5.500-1.400 5.500-6a4.600 4.600 0 0 0-1.300-3.200 4.200 4.200 0 0 0-.1-3.200s-1.100-.3-3.500 1.300a12.300 12.300 0 0 0-6.200 0C6.500 2.800 5.400 3.100 5.400 3.100a4.200 4.200 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 9.500c0 4.600 2.700 5.700 5.500 6-.6.6-.6 1.200-.5 2V21" />
        </svg>
      </a>
      <a
        href={identity.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        data-tip="LinkedIn"
        aria-label="LinkedIn"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10.500V17M8 7.200v.1M12 17v-6.500m0 3c0-2 4.500-3 4.500.5V17" />
        </svg>
      </a>
      <hr />
      <button
        type="button"
        className="theme"
        data-tip="Theme"
        aria-label="Switch between light and dark"
        onClick={toggleTheme}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.500v2M12 19.500v2M2.500 12h2M19.500 12h2M5.300 5.300l1.400 1.400M17.300 17.300l1.400 1.400M5.300 18.700l1.400-1.400M17.300 6.700l1.400-1.400" />
        </svg>
      </button>
    </nav>
  );
}
