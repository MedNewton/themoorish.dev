import { useEffect, useRef, useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './Reveal.module.css';

interface Props {
  children: ReactNode;
  /** stagger delay in ms */
  delay?: number;
  as?: 'div' | 'section' | 'span' | 'li';
  className?: string;
}

/** Fades content up in pixel-y discrete steps once it enters the viewport. */
export default function Reveal({ children, delay = 0, as = 'div', className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={clsx(styles.reveal, shown && styles.shown, className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
