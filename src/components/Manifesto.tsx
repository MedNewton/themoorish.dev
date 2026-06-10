import { useEffect, useRef } from 'react';
import styles from './Manifesto.module.css';
import SectionLabel from './SectionLabel';
import { manifesto } from '../data/content';

const words = manifesto.split(' ');

export default function Manifesto() {
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const spans = Array.from(body.querySelectorAll<HTMLSpanElement>('span'));
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) {
      spans.forEach((span) => span.classList.add(styles.lit));
      return;
    }

    let raf = 0;
    let lit = -1;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = body.getBoundingClientRect();
        const vh = window.innerHeight;
        // Words ignite as the paragraph crosses the middle band of the screen
        const progress = (vh * 0.82 - rect.top) / (rect.height + vh * 0.35);
        const target = Math.floor(
          Math.min(1, Math.max(0, progress)) * spans.length,
        );
        if (target === lit) return;
        for (let i = 0; i < spans.length; i++) {
          spans[i].classList.toggle(styles.lit, i < target);
        }
        lit = target;
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="manifesto" className={styles.section}>
      <SectionLabel index="01" label="Manifesto" />
      <p ref={bodyRef} className={styles.body}>
        {words.map((word, i) => (
          <span key={i}>{word} </span>
        ))}
      </p>
    </section>
  );
}
