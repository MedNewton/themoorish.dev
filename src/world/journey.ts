export interface Chapter {
  id: string;
  index: number;
  label: string;
  place: string;
  quest: string;
}

export const chapters: Chapter[] = [
  {
    id: 'hero',
    index: 0,
    label: 'CH.01',
    place: 'THE DESERT OF ORIGINS',
    quest: 'Begin the journey',
  },
  {
    id: 'about',
    index: 1,
    label: 'CH.02',
    place: 'THE CARAVAN CAMP',
    quest: 'Learn the traveler’s story',
  },
  {
    id: 'skills',
    index: 2,
    label: 'CH.03',
    place: 'THE OASIS BAZAAR',
    quest: 'Gather the tools of the craft',
  },
  {
    id: 'projects',
    index: 3,
    label: 'CH.04',
    place: 'THE CITY OF SHIPPED THINGS',
    quest: 'Witness the quests completed',
  },
  {
    id: 'ai',
    index: 4,
    label: 'CH.05',
    place: 'THE AGENT DISTRICT',
    quest: 'Meet the machine companions',
  },
  {
    id: 'contact',
    index: 5,
    label: 'CH.06',
    place: 'THE SUNRISE GATE',
    quest: 'Start a new game together',
  },
];

/** World-space length of one chapter zone, in logical (low-res) pixels. */
export const ZONE_LEN = 760;
export const WORLD_LEN = ZONE_LEN * chapters.length;

/** World x of the sunrise gate — the traveler's final destination. */
export const GATE_X = ZONE_LEN * 5 + 420;

/** Horizontal screen position of the traveler, as a fraction of view width. */
export const TRAVELER_SCREEN_X = 0.36;

/** World x at the center of a chapter zone. */
export function zoneCenter(index: number): number {
  return index * ZONE_LEN + ZONE_LEN / 2;
}
