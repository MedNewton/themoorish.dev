import { useLayoutEffect, useRef, useState } from 'react';

/*
 * useFitText
 * ──────────
 * Measures a text node's natural width at a reference font-size, then
 * returns the font-size (in px) that makes it fit the given container
 * width exactly. Re-measures on resize via ResizeObserver.
 *
 * Why not CSS clamp? Clamp can only approximate fit because every font
 * has a different width-to-size ratio. Measuring gives us an exact fit
 * without distorting the glyphs (unlike SVG textLength).
 */
export function useFitText<
  C extends HTMLElement,
  T extends HTMLElement,
>(targetWidthRatio = 1, referenceFontSize = 200) {
  const containerRef = useRef<C | null>(null);
  const textRef = useRef<T | null>(null);
  const [fontSize, setFontSize] = useState<number>(referenceFontSize);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const measure = () => {
      const containerWidth = container.clientWidth;
      if (!containerWidth) return;

      // temporarily set the reference size, read the natural width,
      // then compute the size that fits the target width exactly.
      const prev = text.style.fontSize;
      text.style.fontSize = `${referenceFontSize}px`;
      const naturalWidth = text.getBoundingClientRect().width;
      text.style.fontSize = prev;

      if (!naturalWidth) return;

      const target = containerWidth * targetWidthRatio;
      const next = (referenceFontSize * target) / naturalWidth;
      setFontSize(next);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(container);

    // re-measure once the custom web font has loaded, since the natural
    // width changes between fallback and loaded font.
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => undefined);
    }

    return () => ro.disconnect();
  }, [targetWidthRatio, referenceFontSize]);

  return { containerRef, textRef, fontSize };
}
