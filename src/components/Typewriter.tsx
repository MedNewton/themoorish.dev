import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  /** ms per character */
  speed?: number;
  startDelay?: number;
  className?: string;
  showCursor?: boolean;
}

/** Types text out character by character once scrolled into view. */
export default function Typewriter({
  text,
  speed = 28,
  startDelay = 0,
  className,
  showCursor = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), startDelay);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text.length, startDelay]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(id);
  }, [started, count, text.length, speed]);

  const done = count >= text.length;
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {showCursor && !done && started && (
        <span aria-hidden="true" style={{ opacity: 0.9 }}>
          ▌
        </span>
      )}
    </span>
  );
}
