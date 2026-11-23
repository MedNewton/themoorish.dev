import { useState, type CSSProperties } from 'react';
import {
  SIGNATURE_BOTTOM,
  SIGNATURE_GLYPHS,
  SIGNATURE_TOP,
  SIGNATURE_WIDTH,
} from './signatureGlyphs';

/**
 * "med, the moorish" in the site's script font, written out by hand.
 *
 * Each letter is the font's own outline. A pen line traces it in writing
 * order and the ink fills in behind, one letter after the other.
 */
const START = 0.4; // seconds before the pen touches down
const PER_UNIT = 0.0062; // seconds of writing per unit of letter width
const WORD_PAUSE = 0.14;

const letters: { d: string; delay: number; duration: number }[] = [];
let clock = START;
for (const glyph of SIGNATURE_GLYPHS) {
  if (!glyph.d) {
    clock += WORD_PAUSE;
    continue;
  }
  const duration = Math.max(0.16, glyph.w * PER_UNIT);
  letters.push({ d: glyph.d, delay: clock, duration });
  clock += duration * 0.72;
}

const PAD = 6;
const VIEW_BOX = [
  -PAD,
  SIGNATURE_TOP - PAD,
  SIGNATURE_WIDTH + PAD * 2,
  SIGNATURE_BOTTOM - SIGNATURE_TOP + PAD * 2,
].join(' ');

export default function Signature() {
  // Hovering writes it again.
  const [run, setRun] = useState(0);
  return (
    <svg
      key={run}
      className="signature"
      viewBox={VIEW_BOX}
      aria-hidden="true"
      onMouseEnter={() => setRun((n) => n + 1)}
    >
      {letters.map((l, i) => (
        <path
          key={i}
          d={l.d}
          pathLength={1}
          style={
            { '--at': `${l.delay}s`, '--t': `${l.duration}s` } as CSSProperties
          }
        />
      ))}
    </svg>
  );
}
