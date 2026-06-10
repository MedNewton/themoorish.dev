import { create } from 'zustand';

interface JourneyStore {
  chapter: number;
  hasMoved: boolean;
  soundOn: boolean;
  setChapter: (c: number) => void;
  markMoved: () => void;
  toggleSound: () => void;
}

export const useJourneyStore = create<JourneyStore>((set) => ({
  chapter: 0,
  hasMoved: false,
  soundOn: false,
  setChapter: (chapter) => set({ chapter }),
  markMoved: () => set({ hasMoved: true }),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
}));

/**
 * Continuous per-frame values, mutated by the render loop and read via
 * direct DOM updates — never through React state (60fps without re-renders).
 */
export const frameState = {
  progress: 0,
  camX: 0,
  speed: 0,
};
