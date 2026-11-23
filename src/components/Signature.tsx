import { useState, type CSSProperties } from 'react';

/**
 * "med, the moorish" as single-line pen strokes. Every stroke is drawn in
 * writing order, so the logo appears the way a hand would write it.
 *
 * Letters live in their own box: baseline at y=0, x-height at y=-20,
 * ascenders reach y=-42. `w` is the advance to the next letter and `t` is how
 * long the stroke takes relative to the others.
 */
interface Glyph {
  w: number;
  strokes: { d: string; t: number }[];
}

const GLYPHS: Record<string, Glyph> = {
  m: {
    w: 32,
    strokes: [
      {
        d: 'M1 -19C3 -17 4 -8 3 0C5 -10 9 -19 13 -19C17 -19 15 -8 14 0C16 -10 20 -19 24 -19C28 -19 26 -6 27 -3C27.500 0 29.500 0 31 -2',
        t: 1.7,
      },
    ],
  },
  e: {
    w: 17,
    strokes: [
      {
        d: 'M2 -9C7 -9 13 -11 13 -15C13 -19 9 -20 6 -18C2 -16 0 -9 2 -4C4 0 10 1 15 -4',
        t: 1,
      },
    ],
  },
  d: {
    w: 22,
    strokes: [
      {
        d: 'M13 -15C10 -20 3 -19 1 -11C-1 -4 3 1 7 0C11 -1 13 -8 14 -16C15 -26 16 -36 16 -42C15 -28 13 -10 15 -4C16 0 18.500 0 20.500 -2',
        t: 1.7,
      },
    ],
  },
  ',': { w: 9, strokes: [{ d: 'M3 -2C4 1 3 5 0 8', t: 0.3 }] },
  ' ': { w: 11, strokes: [] },
  t: {
    w: 16,
    strokes: [
      { d: 'M8 -36C7 -24 5 -10 6 -4C7 0 10 0 13 -3', t: 0.9 },
      { d: 'M1 -22C6 -23 11 -24 15 -25', t: 0.35 },
    ],
  },
  h: {
    w: 22,
    strokes: [
      {
        d: 'M5 -42C5 -28 3 -12 2 0C4 -10 8 -19 12 -19C16 -19 14 -8 15 -4C15.500 0 18 0 20 -2',
        t: 1.4,
      },
    ],
  },
  o: {
    w: 18,
    strokes: [
      {
        d: 'M9 -19C4 -20 0 -13 1 -7C2 -1 8 -1 11 -5C14 -10 13 -18 9 -19C11 -17 14 -16 17 -17',
        t: 1.1,
      },
    ],
  },
  r: {
    w: 15,
    strokes: [
      {
        d: 'M1 -19C3 -15 3 -8 2 0C3 -9 6 -17 9 -19C11 -20 13 -19 14 -17',
        t: 0.8,
      },
    ],
  },
  i: {
    w: 9,
    strokes: [
      { d: 'M2 -19C3 -13 2 -7 3 -3C4 0 6 0 8 -2', t: 0.5 },
      { d: 'M3 -27L3.400 -26.400', t: 0.12 },
    ],
  },
  s: {
    w: 14,
    strokes: [
      {
        d: 'M11 -17C8 -21 3 -19 3 -15C3 -11 10 -10 10 -5C10 0 4 1 0 -3',
        t: 0.9,
      },
    ],
  },
};

const TEXT = 'med, the moorish';
const UNIT = 0.15; // seconds per unit of stroke time
const START = 0.45;

// Lay the letters out once and give every stroke its place in the timeline.
const strokes: { d: string; x: number; delay: number; duration: number }[] = [];
let cursor = 0;
let clock = START;
for (const ch of TEXT) {
  const glyph = GLYPHS[ch];
  for (const s of glyph.strokes) {
    const duration = s.t * UNIT;
    strokes.push({ d: s.d, x: cursor, delay: clock, duration });
    clock += duration + 0.03;
  }
  if (ch === ' ') clock += 0.12;
  cursor += glyph.w;
}
const WIDTH = cursor;

export default function Signature() {
  // Hovering writes it again.
  const [run, setRun] = useState(0);
  return (
    <svg
      key={run}
      className="signature"
      viewBox={`-4 -46 ${WIDTH + 14} 58`}
      aria-hidden="true"
      onMouseEnter={() => setRun((n) => n + 1)}
    >
      <g transform="skewX(-9)">
        {strokes.map((s, i) => (
          <path
            key={i}
            d={s.d}
            pathLength={1}
            transform={`translate(${s.x} 0)`}
            style={
              {
                '--at': `${s.delay}s`,
                '--t': `${s.duration}s`,
              } as CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  );
}
