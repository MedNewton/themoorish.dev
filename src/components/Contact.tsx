import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Contact.module.css';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { identity } from '../data/content';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <SectionLabel index="05" label="Contact" />

      <Reveal as="h2" className={styles.title}>
        Let’s build.
      </Reveal>

      <Reveal delay={120}>
        <button type="button" className={styles.email} onClick={copy}>
          <span className={styles.emailLine}>MED.BENMOUSSA.DEV</span>
          <span className={clsx(styles.emailLine, styles.emailTail)}>
            @GMAIL.COM
          </span>
          <span
            className={clsx(styles.copyTip, copied && styles.copiedTip)}
            aria-live="polite"
          >
            {copied ? '✓ Copied to clipboard' : 'Click to copy'}
          </span>
        </button>
      </Reveal>

      <Reveal as="ul" className={styles.links} delay={220}>
        <li>
          <a href={identity.github} target="_blank" rel="noreferrer noopener">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a href={identity.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a href={`mailto:${identity.email}`}>
            Email <span aria-hidden="true">↗</span>
          </a>
        </li>
      </Reveal>
    </section>
  );
}
