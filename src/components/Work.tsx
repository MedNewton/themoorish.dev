import { useState } from 'react';
import clsx from 'clsx';
import styles from './Work.module.css';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import { works } from '../data/content';

export default function Work() {
  const [open, setOpen] = useState<string | null>(works[0].index);

  return (
    <section id="work" className={styles.section}>
      <SectionLabel index="04" label="Selected Work — 13 Entries" />
      <ul className={styles.list}>
        {works.map((work, i) => {
          const isOpen = open === work.index;
          return (
            <Reveal
              as="li"
              key={work.index}
              className={styles.row}
              delay={(i % 4) * 60}
            >
              <button
                type="button"
                className={clsx(styles.head, isOpen && styles.headOpen)}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : work.index)}
              >
                <span className={styles.num}>{work.index}</span>
                <span className={styles.title}>{work.title}</span>
                <span className={styles.tag}>{work.tag}</span>
                <span
                  className={clsx(styles.toggle, isOpen && styles.toggleOpen)}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div className={clsx(styles.drawer, isOpen && styles.drawerOpen)}>
                <div className={styles.drawerInner}>
                  <p className={styles.description}>{work.description}</p>
                  <div className={styles.drawerFoot}>
                    <p className={styles.tech}>{work.tech}</p>
                    {work.link ? (
                      <a
                        className={styles.visit}
                        href={work.link}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Visit <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <span className={styles.confidential}>Private build</span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
