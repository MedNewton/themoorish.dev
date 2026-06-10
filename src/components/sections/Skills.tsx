import type { CSSProperties } from 'react';
import { skillGroups } from '@/data/profile';
import Reveal from '@/components/Reveal';
import { sfx } from '@/world/sound';
import styles from './sections.module.css';

const rarityLabel = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
} as const;

export default function Skills() {
  return (
    <section className={styles.section} data-chapter="2" id="skills">
      <div className={styles.inner}>
        <Reveal>
          <p className={styles.kicker}>Chapter 03 — The Oasis Bazaar</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className={styles.title}>
            <span className={styles.titleAccent}>Inventory</span> — tools of the craft
          </h2>
        </Reveal>
        <div className={styles.invGroups}>
          {skillGroups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 70}>
              <div>
                <p className={styles.invGroupLabel}>{group.label}</p>
                <ul className={styles.invGrid} style={{ listStyle: 'none' }}>
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className={styles.slot}
                      tabIndex={0}
                      onMouseEnter={() => sfx.pickup()}
                      style={{ '--slot-rarity': `var(--rarity-${item.rarity})` } as CSSProperties}
                    >
                      <span className={styles.slotIcon} aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className={styles.slotName}>{item.name}</span>
                      <span className={styles.slotTip} role="tooltip">
                        ★ {rarityLabel[item.rarity]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
