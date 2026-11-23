import { useState, type CSSProperties } from 'react';
import { projects, type Project } from '../data/projects';
import { useReducedMotion } from '../hooks';

const withShots = projects.filter((p) => p.shot);
const half = Math.ceil(withShots.length / 2);
const rowA = withShots.slice(0, half);
const rowB = withShots.slice(half);

function Card({ project, clone }: { project: Project; clone?: boolean }) {
  return (
    <a
      className="card"
      style={{ width: project.width }}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={clone ? -1 : undefined}
      aria-hidden={clone || undefined}
    >
      <img
        src={`/shots/${project.shot}.webp`}
        alt={`${project.name} website`}
        loading="lazy"
        decoding="async"
      />
      <span className="cap">
        <b>{project.name}</b>
        <span>{project.line}</span>
      </span>
    </a>
  );
}

/** One drifting row. The items are rendered twice so the loop is seamless. */
function Row({ items, reverse }: { items: Project[]; reverse?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className={reverse ? 'row b' : 'row'}>
      {items.map((p) => (
        <Card key={p.name} project={p} />
      ))}
      {!reduced &&
        items.map((p) => <Card key={`${p.name}-clone`} project={p} clone />)}
    </div>
  );
}

export default function Work() {
  const [open, setOpen] = useState(false);
  return (
    <section id="work">
      <div className="shead in" style={{ '--i': 3 } as CSSProperties}>
        <h2>Things I build</h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="all-projects"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Show less' : 'See all'}
        </button>
      </div>

      <div className="rows in" style={{ '--i': 4 } as CSSProperties}>
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>

      {open && (
        <div className="all" id="all-projects">
          {projects.map((p, i) => {
            const style = { '--i': i } as CSSProperties;
            const body = (
              <>
                <b>{p.name}</b>
                <span>{p.line}</span>
                <em>{p.url ? '↗' : 'private'}</em>
              </>
            );
            return p.url ? (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={style}
              >
                {body}
              </a>
            ) : (
              <div key={p.name} style={style}>
                {body}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
