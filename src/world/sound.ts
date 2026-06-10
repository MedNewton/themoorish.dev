/**
 * Tiny WebAudio chiptune blips. Everything is synthesized — no audio files.
 * The engine stays silent until the user opts in via the HUD toggle.
 */
let ctx: AudioContext | null = null;
let enabled = false;

function ensureCtx(): AudioContext | null {
  if (!ctx) {
    try {
      ctx = new AudioContext();
    } catch {
      return null;
    }
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  if (on) ensureCtx();
}

function blip(freq: number, dur: number, type: OscillatorType, gain = 0.04, slide = 0) {
  if (!enabled) return;
  const ac = ensureCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime);
  if (slide) osc.frequency.exponentialRampToValueAtTime(freq + slide, ac.currentTime + dur);
  g.gain.setValueAtTime(gain, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  osc.connect(g).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + dur);
}

export const sfx = {
  hover: () => blip(620, 0.05, 'square', 0.02),
  click: () => blip(440, 0.08, 'square', 0.035, 220),
  chapter: () => {
    blip(523, 0.12, 'triangle', 0.05);
    setTimeout(() => blip(659, 0.12, 'triangle', 0.05), 90);
    setTimeout(() => blip(784, 0.2, 'triangle', 0.05), 180);
  },
  pickup: () => blip(880, 0.1, 'square', 0.03, 440),
};
