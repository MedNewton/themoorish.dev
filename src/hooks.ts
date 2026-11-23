import { useCallback, useEffect, useRef, useState } from 'react';

const query = (q: string) =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(q)
    : null;

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => query('(prefers-reduced-motion: reduce)')?.matches ?? false,
  );
  useEffect(() => {
    const mq = query('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/**
 * Blur-and-rise reveal for content that starts below the fold. Content already
 * on screen is left alone, so the page is complete without scrolling.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || typeof IntersectionObserver === 'undefined') {
      el?.classList.remove('pre');
      return;
    }
    if (el.getBoundingClientRect().top > window.innerHeight * 0.95) {
      el.classList.add('pre');
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.remove('pre');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  return ref;
}

/** Which section sits in the reading band of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    for (const id of ids.slice(1)) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    const onScroll = () => {
      if (window.scrollY < 120) setActive(ids[0]);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
    // ids is a module-level constant at every call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

type Theme = 'light' | 'dark';
const THEME_KEY = 'theme';

export function useTheme() {
  const toggle = useCallback(() => {
    const root = document.documentElement;
    const current: Theme = root.dataset.theme === 'light' ? 'light' : 'dark';
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // storage unavailable: the choice simply lasts for this visit
    }
  }, []);
  return toggle;
}

export function scrollToId(id: string, reduced: boolean) {
  const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth';
  if (id === 'overview') window.scrollTo({ top: 0, behavior });
  else
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
