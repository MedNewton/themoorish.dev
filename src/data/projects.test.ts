import { existsSync } from 'node:fs';
import path from 'node:path';
import { projects, toolkit, countIn } from './projects';

describe('projects data', () => {
  it('has unique names', () => {
    const names = projects.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('has a screenshot file and a width for every project that shows one', () => {
    for (const p of projects.filter((x) => x.shot)) {
      const file = path.resolve('public/shots', `${p.shot}.webp`);
      expect(existsSync(file), `${p.name}: ${file}`).toBe(true);
      expect(p.width, p.name).toBeGreaterThan(0);
      expect(p.url, p.name).toMatch(/^https:\/\//);
    }
  });

  it('counts at least one project for every toolkit category', () => {
    for (const row of toolkit) {
      if (row.category)
        expect(countIn(row.category), row.title).toBeGreaterThan(0);
    }
  });
});
